<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => \Illuminate\Support\Str::uuid(),
            'user_id' => User::factory(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'property_address' => fake()->streetAddress(),
            'property_city' => fake()->city(),
            'property_state' => fake()->stateAbbr(),
            'property_zip' => fake()->postcode(),
            'property_type' => 'single_family',
            'ai_score' => fake()->numberBetween(0, 100),
            'motivation_score' => fake()->numberBetween(0, 100),
            'urgency_score' => fake()->numberBetween(0, 100),
            'financial_score' => fake()->numberBetween(0, 100),
            'source' => 'manual',
            'status' => 'new',
        ];
    }
}
