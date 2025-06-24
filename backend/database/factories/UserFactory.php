<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => Str::uuid(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'password' => static::$password ??= Hash::make('password'),
            'company_name' => fake()->company(),
            'role' => 'wholesaler',
            'level' => 1,
            'points' => 0,
            'avatar_url' => fake()->imageUrl(),
            'blockchain_wallet' => Str::random(42),
            'stripe_customer_id' => 'cus_' . Str::random(14),
            'subscription_tier' => 'starter',
            'subscription_status' => 'active',
            'is_verified' => false,
            'is_active' => true,
            'preferences' => '{}',
            'metadata' => '{}',
            'last_login_at' => now(),
            'email_verified_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
