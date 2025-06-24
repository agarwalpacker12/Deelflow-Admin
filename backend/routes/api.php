<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\DealController;
use App\Http\Controllers\Api\UserAchievementController;
use App\Http\Controllers\Api\PropertySaveController;
use App\Http\Controllers\Api\DealMilestoneController;
use App\Http\Controllers\Api\AiConversationController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\CampaignRecipientController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('leads', LeadController::class);
Route::apiResource('properties', PropertyController::class);
Route::apiResource('deals', DealController::class);
Route::apiResource('user-achievements', UserAchievementController::class);
Route::apiResource('property-saves', PropertySaveController::class);
Route::apiResource('deal-milestones', DealMilestoneController::class);
Route::apiResource('ai-conversations', AiConversationController::class);
Route::apiResource('campaigns', CampaignController::class);
Route::apiResource('campaign-recipients', CampaignRecipientController::class);
