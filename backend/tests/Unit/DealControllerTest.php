<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Deal;
use App\Models\Property;
use App\Models\Lead;
use App\Models\User;
use App\Models\DealMilestone;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DealControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $property;
    protected $lead;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->property = Property::factory()->create(['user_id' => $this->user->id]);
        $this->lead = Lead::factory()->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user, 'sanctum');
    }

    /** @test */
    public function index_method_returns_paginated_deals()
    {
        Deal::factory()->count(15)->create([
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'wholesaler_id' => $this->user->id
        ]);

        $response = $this->getJson('/api/deals');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'data',
                    'meta',
                ]
            ]);
    }

    /** @test */
    public function store_method_validates_required_fields()
    {
        $response = $this->postJson('/api/deals', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['property_id', 'deal_type', 'purchase_price', 'contract_date', 'closing_date']);
    }

    /** @test */
    public function store_method_creates_deal_successfully()
    {
        $dealData = [
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'deal_type' => 'wholesale',
            'purchase_price' => 100000,
            'contract_date' => '2025-01-01',
            'closing_date' => '2025-02-01',
        ];

        $response = $this->postJson('/api/deals', $dealData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => ['id', 'property_id', 'deal_type', 'purchase_price']
            ]);

        $this->assertDatabaseHas('deals', [
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'deal_type' => 'wholesale',
            'purchase_price' => 100000,
            'wholesaler_id' => $this->user->id
        ]);
    }

    /** @test */
    public function show_method_returns_existing_deal()
    {
        $deal = Deal::factory()->create([
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'wholesaler_id' => $this->user->id
        ]);

        $response = $this->getJson("/api/deals/{$deal->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'id' => $deal->id
                ]
            ]);
    }

    /** @test */
    public function update_method_updates_deal_successfully()
    {
        $deal = Deal::factory()->create([
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'wholesaler_id' => $this->user->id,
            'purchase_price' => 100000
        ]);

        $updateData = [
            'purchase_price' => 110000,
            'status' => 'active'
        ];

        $response = $this->putJson("/api/deals/{$deal->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'id' => $deal->id,
                    'purchase_price' => 110000,
                    'status' => 'active'
                ]
            ]);
    }

    /** @test */
    public function destroy_method_deletes_deal_successfully()
    {
        $deal = Deal::factory()->create([
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'wholesaler_id' => $this->user->id
        ]);

        $response = $this->deleteJson("/api/deals/{$deal->id}");

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);

        $this->assertDatabaseMissing('deals', ['id' => $deal->id]);
    }

    /** @test */
    public function milestones_method_returns_deal_milestones()
    {
        $deal = Deal::factory()->create([
            'property_id' => $this->property->id,
            'lead_id' => $this->lead->id,
            'wholesaler_id' => $this->user->id
        ]);

        DealMilestone::factory()->count(3)->create(['deal_id' => $deal->id]);

        $response = $this->getJson("/api/deals/{$deal->id}/milestones");

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }
}
