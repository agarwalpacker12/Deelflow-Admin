<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;

class UserRolePermissionController extends Controller
{
    
    public function index()
    {
        $orgId = auth()->user()->organization_id;

        return User::with('roles', 'permissions')
            ->where('organization_id', $orgId)
            ->get();
    }
    //  Show user only if from same organization
    public function show(User $user)
    {
        $this->authorizeUser($user);

        return $user->load('roles', 'permissions');
    }

    // smae organization wise roles and its corresponding permissions
    public function getOrganizationRolesWithPermissions()
    {
        $organizationId = auth()->user()->organization_id;

        $roles = Role::with('permissions')
            ->where('organization_id', $organizationId)
            ->get();

        return response()->json([
            'roles' => $roles
        ],200);
    }
    // same organization permissions only
    public function getOrganizationPermissions()
    {
        $organizationId = auth()->user()->organization_id;

        $permissions = Permission::where('organization_id', $organizationId)->get();

        return response()->json([
            'permissions' => $permissions
        ]);
    }

    //  Update user's roles scoped to organization
    public function updateRoles(Request $request, User $user)
    {
        $this->authorizeUser($user);

        $orgId = auth()->user()->organization_id;

        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        $roleIds = Role::where('organization_id', $orgId)
            ->whereIn('name', $request->roles)
            ->pluck('id');

        $user->roles()->sync($roleIds);

        return response()->json([
            'message' => 'User roles updated',
            'roles' => $user->roles()->get(),
        ]);
    }

    // Update user's direct permissions scoped to organization
    public function updatePermissions(Request $request, User $user)
    {
        $this->authorizeUser($user);

        $orgId = auth()->user()->organization_id;

        $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $permissionIds = Permission::where('organization_id', $orgId)
            ->whereIn('name', $request->permissions)
            ->pluck('id');

        $user->permissions()->sync($permissionIds);

        return response()->json([
            'message' => 'User permissions updated',
            'permissions' => $user->permissions()->get(),
        ]);
    }

    private function authorizeUser(User $user)
    {
        if ($user->organization_id !== auth()->user()->organization_id) {
            abort(403, 'Unauthorized: Cross-organization access is not allowed.');
        }
    }
}
