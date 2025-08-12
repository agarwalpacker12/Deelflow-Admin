<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

class OrganizationRolePermissionSetupService
{
    /**
     * Set up global roles, permissions, and assign role to the given user.
     * Note: Roles and permissions are now global, not organization-specific.
     *
     * @param Organization $organization
     * @param User $user
     * @param string $userRoleName
     * @return void
     */
    public function setup(Organization $organization, User $user, string $userRoleName = 'admin'): void
    {
        // Get or create default global roles
        $roles = [
            'admin' => Role::firstOrCreate(
                ['name' => 'admin'],
                ['label' => 'Administrator']
            ),
            'staff' => Role::firstOrCreate(
                ['name' => 'staff'],
                ['label' => 'Staff Member']
            ),
        ];

        // Get or create default global permissions 
        $permissions = [
            'manage_roles' => Permission::firstOrCreate(
                ['name' => 'manage_roles'],
                ['label' => 'Manage Roles']
            ),
            'manage_client' => Permission::firstOrCreate(
                ['name' => 'manage_client'],
                ['label' => 'Manage Clients']
            ),
            'manage_campaign' => Permission::firstOrCreate(
                ['name' => 'manage_campaign'],
                ['label' => 'Manage Campaign']
            ),
            'manage_org' => Permission::firstOrCreate(
                ['name' => 'manage_org'],
                ['label' => 'Manage Organization']
            ),
            'manage_lead' => Permission::firstOrCreate(
                ['name' => 'manage_lead'],
                ['label' => 'Manage Lead']
            ),
            'manage_properties' => Permission::firstOrCreate(
                ['name' => 'manage_properties'],
                ['label' => 'Manage Properties']
            ),
        ];

        // Assign permissions to roles (only if not already assigned)
        if ($roles['admin']->permissions()->count() === 0) {
            $roles['admin']->permissions()->attach(collect($permissions)->pluck('id'));
        }
        
        if ($roles['staff']->permissions()->count() === 0) {
            $roles['staff']->permissions()->attach([
                $permissions['manage_lead']->id,
                $permissions['manage_properties']->id,
                $permissions['manage_campaign']->id,
            ]);
        }

        // Assign the requested role to the user (if not already assigned)
        if (!$user->roles()->where('name', $userRoleName)->exists()) {
            $user->roles()->attach($roles[$userRoleName]->id);
        }
    }
}
