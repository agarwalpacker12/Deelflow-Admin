<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $permissions = [
            'users' => ['view users', 'manage users', 'impersonate users'],
            'roles' => ['view roles', 'manage roles'],
            'permissions' => ['view permissions', 'manage permissions'],
            'settings' => ['view settings', 'manage settings'],
            'deals' => ['view deals', 'manage deals'],
            'leads' => ['view leads', 'manage leads'],
            'properties' => ['view properties', 'manage properties'],
            'campaigns' => ['view campaigns', 'manage campaigns'],
            'organizations' => ['view organizations', 'manage organizations'],
        ];

        // Create permissions
        foreach ($permissions as $group => $permissionNames) {
            foreach ($permissionNames as $name) {
                Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web', 'group' => $group]);
            }
        }

        // Define roles and assign permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $superAdminRole->givePermissionTo(Permission::all());

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->givePermissionTo(['view users', 'manage users', 'view deals', 'manage deals']);

        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
        $userRole->givePermissionTo(['view deals']);
    }
}
