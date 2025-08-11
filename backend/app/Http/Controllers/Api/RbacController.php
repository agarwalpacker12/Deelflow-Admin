<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\MockableController;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Organization;
use Illuminate\Support\Facades\Validator;

class RbacController extends Controller
{
    use MockableController;

    public function __construct()
    {
        $this->initializeMockDataService();
    }

    /**
     * Get roles with their permissions:
     * - Super Admin: All roles with their permissions
     * - Organization Admin: All roles except super admin role with their permissions
     */
    public function getRoles(Request $request)
    {
        try {
            $user = $request->user();

            // Super admin can see all roles
            if ($user->isSuperAdmin()) {
                $roles = Role::with(['permissions', 'users'])->get();

                $formattedRoles = $roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                        'label' => $role->label,
                        'organization_id' => $role->organization_id,
                        'users_count' => $role->users->count(),
                        'permissions' => $role->permissions->map(function ($permission) {
                            return [
                                'id' => $permission->id,
                                'name' => $permission->name,
                                'label' => $permission->label,
                            ];
                        }),
                        'created_at' => $role->created_at->toISOString(),
                        'updated_at' => $role->updated_at->toISOString(),
                    ];
                });

                return $this->successResponse([
                    'roles' => $formattedRoles,
                    'total_roles' => $formattedRoles->count(),
                ], 'Roles retrieved successfully');
            }

            // Organization admin sees all roles except super admin role
            $roles = Role::with('permissions')
                ->where('name', '!=', 'super_admin') // Exclude super admin role
                ->get();

            $formattedRoles = $roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'label' => $role->label,
                    'organization_id' => $role->organization_id,
                    'permissions' => $role->permissions->map(function ($permission) {
                        return [
                            'id' => $permission->id,
                            'name' => $permission->name,
                            'label' => $permission->label,
                        ];
                    }),
                    'created_at' => $role->created_at->toISOString(),
                    'updated_at' => $role->updated_at->toISOString(),
                ];
            });

            return $this->successResponse([
                'roles' => $formattedRoles,
                'total_roles' => $formattedRoles->count(),
            ], 'Roles retrieved successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('retrieving roles', $e);
        }
    }

    /**
     * Get all permissions with their associated roles (Super Admin only)
     */
    public function getPermissions(Request $request)
    {
        try {
            $user = $request->user();

            // Only super admin can access this endpoint
            if (!$user->isSuperAdmin()) {
                return $this->forbiddenResponse('access permissions data', 'super admin');
            }

            $permissions = Permission::with('roles')->get();

            $formattedPermissions = $permissions->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'label' => $permission->label,
                    'roles' => $permission->roles->map(function ($role) {
                        return [
                            'id' => $role->id,
                            'name' => $role->name,
                            'label' => $role->label,
                            'organization_id' => $role->organization_id,
                        ];
                    }),
                    'created_at' => $permission->created_at->toISOString(),
                    'updated_at' => $permission->updated_at->toISOString(),
                ];
            });

            return $this->successResponse([
                'permissions' => $formattedPermissions,
                'total_permissions' => $formattedPermissions->count(),
            ], 'Permissions retrieved successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('retrieving permissions', $e);
        }
    }

    /**
     * Update role permissions (Super Admin only)
     */
    public function updateRolePermissions(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors(), 'updating role permissions');
        }

        try {
            $user = $request->user();

            // Only super admin can access this endpoint
            if (!$user->isSuperAdmin()) {
                return $this->forbiddenResponse('update role permissions', 'super admin');
            }

            // Get permission IDs that match the role's organization
            $permissionIds = Permission::where('organization_id', $role->organization_id)
                ->whereIn('name', $request->permissions)
                ->pluck('id');

            if ($permissionIds->count() !== count($request->permissions)) {
                return $this->businessLogicErrorResponse(
                    'Some permissions do not exist in the role\'s organization',
                    'INVALID_PERMISSIONS',
                    ['requested_permissions' => $request->permissions, 'organization_id' => $role->organization_id],
                    ['Ensure all permissions exist in the role\'s organization', 'Check permission names for typos']
                );
            }

            // Update role permissions
            $role->permissions()->sync($permissionIds);
            $role->load(['permissions']);

            $updatedPermissions = $role->permissions->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'label' => $permission->label,
                ];
            });

            return $this->successResponse([
                'role_id' => $role->id,
                'role_name' => $role->name,
                'role_label' => $role->label,
                'organization_id' => $role->organization_id,
                'permissions' => $updatedPermissions,
                'updated_at' => now()->toISOString(),
            ], 'Role permissions updated successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('updating role permissions', $e);
        }
    }
}
