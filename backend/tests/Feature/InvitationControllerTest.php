<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Organization;
use App\Models\Role;
use App\Models\Invitation;

class InvitationControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Role::factory()->create(['name' => 'admin', 'label' => 'Admin']);
    }

    public function test_org_admin_can_get_invitations_for_their_organization()
    {
        $organization = Organization::factory()->create();
        $orgAdmin = User::factory()->create(['organization_id' => $organization->id]);
        $orgAdmin->roles()->attach(Role::where('name', 'admin')->first());

        $role = Role::factory()->create(['name' => 'user', 'label' => 'User']);

        Invitation::factory()->count(3)->create([
            'organization_id' => $organization->id,
            'role_id' => $role->id,
        ]);

        $response = $this->actingAs($orgAdmin)->getJson("/api/invitations");

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data.invitations')
            ->assertJsonPath('data.count', 3);
    }
}
