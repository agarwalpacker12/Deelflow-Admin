<?php

namespace Database\Seeders;

use App\Models\Deal;
use App\Models\Lead;
use App\Models\Property;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create super admin user for development
        User::factory()->create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => env('SUPER_ADMIN_EMAIL', 'superadmin@example.com'),
            'password' => env('SUPER_ADMIN_PASSWORD', 'password'),
            'role' => 'admin',
            'is_active' => true,
            'is_verified' => true,
        ]);

        User::factory(10)->create()->each(function ($user) {
            Property::factory(5)->create(['user_id' => $user->id]);
            Lead::factory(5)->create(['user_id' => $user->id]);
        });

        Deal::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
        ]);
    }
}
