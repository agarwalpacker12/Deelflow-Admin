<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\CampaignRecipient;
use App\Models\Campaign;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CampaignRecipientControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $campaign;
    protected $lead;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->campaign = Campaign::factory()->create(['user_id' => $this->user->id]);
        $this->lead = Lead::factory()->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user, 'sanctum');
    }

    /** @test */
    public function index_method_returns_paginated_recipients()
    {
        CampaignRecipient::factory()->count(15)->create([
            'campaign_id' => $this->campaign->id,
            'lead_id' => $this->lead->id
        ]);

        $response = $this->getJson('/api/campaign-recipients');

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
        $response = $this->postJson('/api/campaign-recipients', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['campaign_id', 'lead_ids']);
    }

    /** @test */
    public function store_method_creates_recipient_successfully()
    {
        $recipientData = [
            'campaign_id' => $this->campaign->id,
            'lead_ids' => [$this->lead->id],
        ];

        $response = $this->postJson('/api/campaign-recipients', $recipientData);

        $response->assertStatus(201);

        $this->assertDatabaseHas('campaign_recipients', [
            'campaign_id' => $this->campaign->id,
            'lead_id' => $this->lead->id,
        ]);
    }

    /** @test */
    public function show_method_returns_existing_recipient()
    {
        $recipient = CampaignRecipient::factory()->create([
            'campaign_id' => $this->campaign->id,
            'lead_id' => $this->lead->id
        ]);

        $response = $this->getJson("/api/campaign-recipients/{$recipient->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'id' => $recipient->id
                ]
            ]);
    }

    /** @test */
    public function update_method_updates_recipient_successfully()
    {
        $recipient = CampaignRecipient::factory()->create([
            'campaign_id' => $this->campaign->id,
            'lead_id' => $this->lead->id,
        ]);

        $updateData = [
            'sent_at' => now()->toDateTimeString()
        ];

        $response = $this->putJson("/api/campaign-recipients/{$recipient->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'data' => [
                    'id' => $recipient->id,
                ]
            ]);
    }

    /** @test */
    public function destroy_method_deletes_recipient_successfully()
    {
        $recipient = CampaignRecipient::factory()->create([
            'campaign_id' => $this->campaign->id,
            'lead_id' => $this->lead->id
        ]);

        $response = $this->deleteJson("/api/campaign-recipients/{$recipient->id}");

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);

        $this->assertDatabaseMissing('campaign_recipients', ['id' => $recipient->id]);
    }
}
