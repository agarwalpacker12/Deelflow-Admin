<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;

class UserRolePermissionController extends Controller
{
    // ✅ List users within the same organization
    public function index()
    {
        $orgId = auth()->user()->organization_id;

        return User::with('roles', 'permissions')
            ->where('organization_id', $orgId)
            ->get();
    }
    // ✅ Show user only if from same organization
    public function show(User $user)
    {
        $this->authorizeUser($user);

        return $user->load('roles', 'permissions');
    }

    // ✅ Update user's roles scoped to organization
    public function updateRoles(Request $request, User $user)
    {
        $this->authorizeUser($user);

        $orgId = auth()->user()->organization_id;

        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        // Only assign roles from the same organization
        $roleIds = Role::where('organization_id', $orgId)
            ->whereIn('name', $request->roles)
            ->pluck('id');

        $user->roles()->sync($roleIds);

        return response()->json([
            'message' => 'User roles updated',
            'roles' => $user->roles()->get(),
        ]);
    }

    // ✅ Update user's direct permissions scoped to organization
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

    // 🧱 Private helper to protect cross-org access
    private function authorizeUser(User $user)
    {
        if ($user->organization_id !== auth()->user()->organization_id) {
            abort(403, 'Unauthorized: Cross-organization access is not allowed.');
        }
    }
}
