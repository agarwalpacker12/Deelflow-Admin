<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, ensure we have the basic roles in the system
        $this->createBasicRoles();
        
        // Migrate existing users' legacy roles to RBAC system
        $this->migrateLegacyRoles();
    }

    /**
     * Create basic roles if they don't exist
     */
    private function createBasicRoles(): void
    {
        $basicRoles = [
            ['name' => 'super_admin', 'label' => 'Super Administrator'],
            ['name' => 'admin', 'label' => 'Administrator'],
            ['name' => 'staff', 'label' => 'Staff Member'],
        ];

        foreach ($basicRoles as $roleData) {
            Role::firstOrCreate(
                ['name' => $roleData['name']],
                [
                    'label' => $roleData['label'],
                    'organization_id' => null  // Global roles
                ]
            );
        }
    }

    /**
     * Migrate legacy role column data to RBAC system
     */
    private function migrateLegacyRoles(): void
    {
        // Get all users with their legacy roles
        $users = User::whereNotNull('role')->get();

        foreach ($users as $user) {
            // Skip if user already has roles assigned
            if ($user->roles()->count() > 0) {
                continue;
            }

            // Find the corresponding global role in the RBAC system
            $role = Role::where('name', $user->role)
                       ->whereNull('organization_id')
                       ->first();
            
            if ($role) {
                // Assign the role to the user
                $user->roles()->attach($role->id);
            } else {
                // If role doesn't exist, create it as a global role and assign
                $newRole = Role::create([
                    'name' => $user->role,
                    'label' => ucfirst(str_replace('_', ' ', $user->role)),
                    'organization_id' => null  // Global role
                ]);
                $user->roles()->attach($newRole->id);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove all role assignments (this will clear the role_user table)
        DB::table('role_user')->truncate();
        
        // Optionally remove the created roles (be careful with this in production)
        // Role::whereIn('name', ['super_admin', 'admin', 'staff'])->delete();
    }
};
