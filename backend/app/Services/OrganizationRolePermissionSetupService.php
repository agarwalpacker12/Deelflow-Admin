<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

class OrganizationRolePermissionSetupService
{
    /**
     * Set up roles, permissions, and assign role to the given user.
     *
     * @param Organization $organization
     * @param User $user
     * @param string $userRoleName
     * @return void
     */
    public function setup(Organization $organization, User $user, string $userRoleName = 'admin'): void
    {
        //  Create default roles
        $roles = [
            'admin' => Role::create([
                'name' => 'admin',
                'label' => 'Administrator',
                'organization_id' => $organization->id,
            ]),
            'staff' => Role::create([
                'name' => 'staff',
                'label' => 'Staff Member',
                'organization_id' => $organization->id,
            ]),
        ];

        // Create default permissions 
        $permissions = [
            'manage_roles' => Permission::create([
                'name' => 'manage_roles',
                'label' => 'Manage Roles',
                'organization_id' => $organization->id,
            ]),
            'manage_client' => Permission::create([
                'name' => 'manage_client',
                'label' => 'Manage Clints',
                'organization_id' => $organization->id,
            ]),
            'manage_campaign' => Permission::create([
                'name' => 'manage_campaign',
                'label' => 'Manage Campaign',
                'organization_id' => $organization->id,
            ]),
            'manage_org' => Permission::create([
                'name' => 'manage_org',
                'label' => 'Manage Organization',
                'organization_id' => $organization->id,
            ]),
            'manage_lead' => Permission::create([
                'name' => 'manage_lead',
                'label' => 'Manage Lead',
                'organization_id' => $organization->id,
            ]),
            'manage_properties' => Permission::create([
                'name' => 'manage_properties',
                'label' => 'Manage Properties',
                'organization_id' => $organization->id,
            ]),
        ];

        //  Assign permissions to roles
        $roles['admin']->permissions()->attach(collect($permissions)->pluck('id'));
        $roles['staff']->permissions()->attach([
            $permissions['manage_lead']->id,
            $permissions['manage_properties']->id,
            $permissions['manage_campaign']->id,
        ]);

        // Assign the requested role to the user
        $user->roles()->attach($roles[$userRoleName]->id);
    }
}
