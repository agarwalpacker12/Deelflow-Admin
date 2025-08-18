<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\MockableController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\Validator;

class UserRolePermissionController extends Controller
{
    use MockableController;

    public function __construct()
    {
        $this->initializeMockDataService();
    }

    /**
     * Get all global roles with their assigned permissions.
     * - Super Admin: Returns all roles with user counts.
     * - Regular Users: Returns all roles (except super_admin) without user counts.
     */
    public function getRoles(Request $request)
    {
        try {
            $user = $request->user();

            if ($user->isSuperAdmin()) {
                $roles = Role::withCount('users')->with('permissions')->get();
            } else {
                $roles = Role::where('name', '!=', 'super_admin')->with('permissions')->get();
                // Set users_count to null for non-super admin users
                $roles->each(function ($role) {
                    $role->users_count = null;
                });
            }

            $formattedRoles = $roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'label' => $role->label,
                    'users_count' => $role->users_count,
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
     * Get all global permissions, grouped by the 'group' attribute.
     * This endpoint is only accessible by super admin users.
     */
    public function getPermissions(Request $request)
    {
        try {
            if (!$request->user()->isSuperAdmin()) {
                return $this->forbiddenResponse('access permissions data', 'super admin');
            }

            $permissions = Permission::with('roles')->get();
            $allRoles = Role::all();

            $groupedPermissions = $permissions->groupBy('group')->map(function ($group, $groupName) use ($allRoles) {
                return [
                    'group' => $groupName,
                    'permissions' => $group->map(function ($permission) use ($allRoles) {
                        $assignedRoles = $permission->roles->pluck('id')->toArray();
                        return [
                            'id' => $permission->id,
                            'name' => $permission->name,
                            'label' => $permission->label,
                            'roles' => $allRoles->map(function ($role) use ($assignedRoles) {
                                return [
                                    'id' => $role->id,
                                    'name' => $role->name,
                                    'label' => $role->label,
                                    'enabled' => in_array($role->id, $assignedRoles),
                                ];
                            }),
                            'created_at' => $permission->created_at->toISOString(),
                            'updated_at' => $permission->updated_at->toISOString(),
                        ];
                    }),
                ];
            })->values();

            return $this->successResponse([
                'permission_groups' => $groupedPermissions,
                'total_permissions' => $permissions->count(),
            ], 'Permissions retrieved successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('retrieving permissions', $e);
        }
    }

    /**
     * Update the permissions assigned to a specific global role.
     * This endpoint is only accessible by super admin users.
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
            if (!$request->user()->isSuperAdmin()) {
                return $this->forbiddenResponse('update role permissions', 'super admin');
            }

            $permissionIds = Permission::whereIn('name', $request->permissions)->pluck('id');

            if ($permissionIds->count() !== count($request->permissions)) {
                return $this->businessLogicErrorResponse(
                    'Some permissions do not exist',
                    'INVALID_PERMISSIONS',
                    ['requested_permissions' => $request->permissions],
                    ['Ensure all permissions exist', 'Check permission names for typos']
                );
            }

            $role->permissions()->sync($permissionIds);
            $role->load('permissions');

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
                'permissions' => $updatedPermissions,
                'updated_at' => now()->toISOString(),
            ], 'Role permissions updated successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('updating role permissions', $e);
        }
    }
}
