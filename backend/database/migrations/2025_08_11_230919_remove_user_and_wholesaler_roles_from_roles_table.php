<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Role::whereIn('name', ['user', 'wholesaler'])->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Re-create the roles if needed
        $basicRoles = [
            ['name' => 'user', 'label' => 'User'],
            ['name' => 'wholesaler', 'label' => 'Wholesaler'],
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
};
