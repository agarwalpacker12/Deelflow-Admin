<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\DealController;
use App\Http\Controllers\Api\UserAchievementController;
use App\Http\Controllers\Api\PropertySaveController;
use App\Http\Controllers\Api\DealMilestoneController;
use App\Http\Controllers\Api\AiConversationController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\CampaignRecipientController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\OrganizationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register/invitation/{token}', [AuthController::class, 'registerInvitedUser'])->name('register.invitation');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/invitations', [InvitationController::class, 'store']);
    
    // Lead routes
    Route::apiResource('leads', LeadController::class);
    Route::get('leads/{lead}/ai-score', [LeadController::class, 'aiScore']);
    
    // Property routes
    Route::apiResource('properties', PropertyController::class);
    Route::get('properties/{property}/ai-analysis', [PropertyController::class, 'aiAnalysis']);
    
    // Deal routes
    Route::apiResource('deals', DealController::class);
    Route::get('deals/{deal}/milestones', [DealController::class, 'milestones']);
    
    // Deal milestone routes
    Route::apiResource('deal-milestones', DealMilestoneController::class);
    Route::patch('deal-milestones/{milestone}/complete', [DealMilestoneController::class, 'complete']);
    
    // Property saves routes
    Route::apiResource('property-saves', PropertySaveController::class);
    
    // AI conversation routes
    Route::apiResource('ai-conversations', AiConversationController::class);
    
    // Campaign routes
    Route::apiResource('campaigns', CampaignController::class);
    Route::get('campaigns/{campaign}/recipients', [CampaignController::class, 'recipients']);
    
    // Campaign recipient routes
    Route::apiResource('campaign-recipients', CampaignRecipientController::class);
    
    // Client routes
    Route::apiResource('clients', ClientController::class);

    // Organization routes
    Route::get('/organization', [OrganizationController::class, 'show']);
    Route::put('/organization', [OrganizationController::class, 'update']);
    
    // User achievement routes
    Route::apiResource('user-achievements', UserAchievementController::class);
});

// Mock-enabled routes (for development/testing when mock data is enabled)
Route::group(['middleware' => 'api'], function () {
    // These routes will work with mock data when MOCK_DATA_ENABLED=true
    // and bypass authentication for easier testing
    
    if (config('mockdata.enabled')) {
        // Mock authentication routes
        Route::post('/mock/register', [AuthController::class, 'register']);
        Route::post('/mock/login', [AuthController::class, 'login']);
        
        // Mock data routes (no auth required when in mock mode)
        Route::get('/mock/leads', [LeadController::class, 'index']);
        Route::post('/mock/leads', [LeadController::class, 'store']);
        Route::get('/mock/leads/{lead}', [LeadController::class, 'show']);
        Route::put('/mock/leads/{lead}', [LeadController::class, 'update']);
        Route::delete('/mock/leads/{lead}', [LeadController::class, 'destroy']);
        Route::get('/mock/leads/{lead}/ai-score', [LeadController::class, 'aiScore']);
        
        Route::get('/mock/properties', [PropertyController::class, 'index']);
        Route::post('/mock/properties', [PropertyController::class, 'store']);
        Route::get('/mock/properties/{property}', [PropertyController::class, 'show']);
        Route::put('/mock/properties/{property}', [PropertyController::class, 'update']);
        Route::delete('/mock/properties/{property}', [PropertyController::class, 'destroy']);
        Route::get('/mock/properties/{property}/ai-analysis', [PropertyController::class, 'aiAnalysis']);
        
        Route::get('/mock/deals', [DealController::class, 'index']);
        Route::post('/mock/deals', [DealController::class, 'store']);
        Route::get('/mock/deals/{deal}', [DealController::class, 'show']);
        Route::put('/mock/deals/{deal}', [DealController::class, 'update']);
        Route::delete('/mock/deals/{deal}', [DealController::class, 'destroy']);
        
        Route::get('/mock/campaigns', [CampaignController::class, 'index']);
        Route::post('/mock/campaigns', [CampaignController::class, 'store']);
        Route::get('/mock/campaigns/{campaign}', [CampaignController::class, 'show']);
        Route::put('/mock/campaigns/{campaign}', [CampaignController::class, 'update']);
        Route::delete('/mock/campaigns/{campaign}', [CampaignController::class, 'destroy']);
        
        Route::get('/mock/ai-conversations', [AiConversationController::class, 'index']);
        Route::post('/mock/ai-conversations', [AiConversationController::class, 'store']);
        Route::get('/mock/ai-conversations/{conversation}', [AiConversationController::class, 'show']);
        
        Route::get('/mock/user-achievements', [UserAchievementController::class, 'index']);
        
        Route::get('/mock/property-saves', [PropertySaveController::class, 'index']);
        Route::post('/mock/property-saves', [PropertySaveController::class, 'store']);
        Route::delete('/mock/property-saves/{save}', [PropertySaveController::class, 'destroy']);
        
        Route::get('/mock/deal-milestones', [DealMilestoneController::class, 'index']);
        Route::post('/mock/deal-milestones', [DealMilestoneController::class, 'store']);
        Route::patch('/mock/deal-milestones/{milestone}/complete', [DealMilestoneController::class, 'complete']);
        
        Route::get('/mock/campaign-recipients', [CampaignRecipientController::class, 'index']);
        Route::post('/mock/campaign-recipients', [CampaignRecipientController::class, 'store']);
    }
});
