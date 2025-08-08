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
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $organization = $request->user()->organization;
        return response()->json($organization);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $organization = $request->user()->organization;

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
}
