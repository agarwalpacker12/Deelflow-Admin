<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json([$user->organization]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:organizations,name',
            'industry' => 'nullable|string|max:255',
            'organization_size' => 'nullable|string|max:255',
            'business_email' => 'nullable|email|max:255',
            'business_phone' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'support_email' => 'nullable|email|max:255',
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state_province' => 'nullable|string|max:255',
            'zip_postal_code' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();
        $validatedData['slug'] = Str::slug($validatedData['name']);

        $organization = Organization::create($validatedData);

        return response()->json($organization, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        return response()->json($organization);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Organization $organization)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:organizations,name,' . $organization->id,
            'industry' => 'nullable|string|max:255',
            'organization_size' => 'nullable|string|max:255',
            'business_email' => 'nullable|email|max:255',
            'business_phone' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'support_email' => 'nullable|email|max:255',
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state_province' => 'nullable|string|max:255',
            'zip_postal_code' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();

        if (isset($validatedData['name'])) {
            $validatedData['slug'] = Str::slug($validatedData['name']);
        }

        $organization->update($validatedData);

        return response()->json($organization);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        if ($organization->users()->where('role', 'admin')->count() > 0) {
            return response()->json(['error' => 'Cannot delete an organization with an admin user.'], 403);
        }

        $organization->delete();

        return response()->json(null, 204);
    }

    public function getStatus(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'super_admin') {
            return response()->json(['status' => 'super_admin']);
        }

        if ($user->organization) {
            return response()->json(['status' => $user->organization->subscription_status]);
        }

        return response()->json(['status' => null], 404);
    }

    public function updateSubscriptionStatus(Request $request, Organization $organization)
    {
        $validator = Validator::make($request->all(), [
            'subscription_status' => 'required|string|in:new,active,suspended,waiting',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $organization->update($validator->validated());

        return response()->json($organization);
    }

    public function removeUser(Request $request, Organization $organization, User $user)
    {
        if ($user->role === 'admin' && $organization->users()->where('role', 'admin')->count() === 1) {
            return response()->json(['error' => 'Cannot remove the only admin user from an organization.'], 403);
        }

        $user->update(['is_active' => false, 'status' => 'cancelled']);

        return response()->json(null, 204);
    }

    public function updateUserStatus(Request $request, Organization $organization, User $user)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $newStatus = $validator->validated()['status'];
        $isActive = $newStatus === 'active';

        $user->update([
            'status' => $newStatus,
            'is_active' => $isActive,
        ]);

        return response()->json($user);
    }
}
