<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Traits\MockableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    use MockableController;

    public function __construct()
    {
        $this->initializeMockDataService();
    }

    /**
     * Display a listing of properties with filtering and pagination
     */
    public function index(Request $request)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockIndex($request);
        }

        // Real implementation
        [$page, $perPage] = $this->getPaginationParams($request);
        
        $query = Property::query();

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('city')) {
            $query->where('city', 'ILIKE', "%{$request->city}%");
        }

        if ($request->has('state')) {
            $query->where('state', $request->state);
        }

        if ($request->has('zip')) {
            $query->where('zip', $request->zip);
        }

        if ($request->has('price_min')) {
            $query->where('purchase_price', '>=', $request->price_min);
        }

        if ($request->has('price_max')) {
            $query->where('purchase_price', '<=', $request->price_max);
        }

        if ($request->has('bedrooms')) {
            $query->where('bedrooms', $request->bedrooms);
        }

        if ($request->has('bathrooms')) {
            $query->where('bathrooms', $request->bathrooms);
        }

        if ($request->has('transaction_type')) {
            $query->where('transaction_type', $request->transaction_type);
        }

        if ($request->has('ai_score_min')) {
            $query->where('ai_score', '>=', $request->ai_score_min);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('address', 'ILIKE', "%{$search}%")
                  ->orWhere('city', 'ILIKE', "%{$search}%")
                  ->orWhere('description', 'ILIKE', "%{$search}%");
            });
        }

        $properties = $query->paginate($perPage, ['*'], 'page', $page);

        // According to API docs, properties list should just return data array without meta
        return $this->successResponse($properties->items(), 'Properties retrieved successfully');
    }

    /**
     * Store a newly created property
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'required|string|max:500',
            'unit' => 'nullable|string|max:50',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:2',
            'zip' => 'required|string|max:10',
            'county' => 'nullable|string|max:100',
            'property_type' => 'required|in:single_family,townhouse,condo,duplex,multi_family,mobile_home',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|numeric|min:0',
            'square_feet' => 'nullable|integer|min:0',
            'lot_size' => 'nullable|numeric|min:0',
            'year_built' => 'nullable|integer|min:1800|max:' . date('Y'),
            'purchase_price' => 'required|numeric|min:0',
            'arv' => 'required|numeric|min:0',
            'repair_estimate' => 'nullable|numeric|min:0',
            'holding_costs' => 'nullable|numeric|min:0',
            'transaction_type' => 'required|in:assignment,double_close,wholesale,fix_and_flip,buy_and_hold',
            'assignment_fee' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'seller_notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($this->isMockEnabled()) {
            return $this->handleMockStore($request);
        }

        // Real implementation
        try {
            $validatedData = $validator->validated();
            $property = Property::create(array_merge($validatedData, [
                'user_id' => auth()->id(),
                'uuid' => \Illuminate\Support\Str::uuid(),
                'ai_score' => rand(60, 100), // Mock AI score for now
                'status' => 'draft'
            ]));

            return $this->successResponse($property, 'Property created successfully', 201);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to create property');
        }
    }

    /**
     * Display the specified property
     */
    public function show($id)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockShow($id);
        }

        // Real implementation
        $property = Property::find($id);

        if (!$property) {
            return $this->notFoundResponse('Property not found');
        }

        return $this->successResponse($property, 'Property retrieved successfully');
    }

    /**
     * Update the specified property
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'sometimes|string|max:500',
            'unit' => 'sometimes|string|max:50',
            'city' => 'sometimes|string|max:100',
            'state' => 'sometimes|string|max:2',
            'zip' => 'sometimes|string|max:10',
            'county' => 'sometimes|string|max:100',
            'property_type' => 'sometimes|in:single_family,townhouse,condo,duplex,multi_family,mobile_home',
            'bedrooms' => 'sometimes|integer|min:0',
            'bathrooms' => 'sometimes|numeric|min:0',
            'square_feet' => 'sometimes|integer|min:0',
            'lot_size' => 'sometimes|numeric|min:0',
            'year_built' => 'sometimes|integer|min:1800|max:' . date('Y'),
            'purchase_price' => 'sometimes|numeric|min:0',
            'arv' => 'sometimes|numeric|min:0',
            'repair_estimate' => 'sometimes|numeric|min:0',
            'holding_costs' => 'sometimes|numeric|min:0',
            'transaction_type' => 'sometimes|in:assignment,double_close,wholesale,fix_and_flip,buy_and_hold',
            'assignment_fee' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:draft,active,pending,sold',
            'description' => 'sometimes|string',
            'seller_notes' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($this->isMockEnabled()) {
            return $this->handleMockUpdate($request, $id);
        }

        // Real implementation
        $property = Property::find($id);

        if (!$property) {
            return $this->notFoundResponse('Property not found');
        }

        try {
            $validatedData = $validator->validated();
            $property->update($validatedData);
            return $this->successResponse($property, 'Property updated successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to update property');
        }
    }

    /**
     * Remove the specified property
     */
    public function destroy($id)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockDestroy($id);
        }

        // Real implementation
        $property = Property::find($id);

        if (!$property) {
            return $this->notFoundResponse('Property not found');
        }

        try {
            $property->delete();
            return $this->successResponse(null, 'Property deleted successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to delete property');
        }
    }

    /**
     * Get AI analysis for a specific property
     */
    public function aiAnalysis($id)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockAiAnalysis($id);
        }

        // Real implementation
        $property = Property::find($id);

        if (!$property) {
            return $this->notFoundResponse('Property not found');
        }

        // Mock AI analysis for now
        $analysis = [
            'property_id' => $property->id,
            'ai_score' => $property->ai_score,
            'market_analysis' => [
                'comparable_sales' => [
                    ['address' => '123 Oak Ave', 'sale_price' => 245000, 'date' => '2025-05-15'],
                    ['address' => '789 Oak Ave', 'sale_price' => 255000, 'date' => '2025-04-20']
                ],
                'market_trends' => 'Appreciating market with 8% YoY growth',
                'days_on_market_avg' => 25
            ],
            'repair_analysis' => [
                'estimated_repairs' => $property->repair_estimate,
                'priority_items' => ['Roof repair', 'HVAC system', 'Kitchen updates'],
                'timeline_estimate' => '6-8 weeks'
            ],
            'investment_metrics' => [
                'profit_potential' => $property->profit_potential,
                'roi_percentage' => 22.2,
                'break_even_price' => 210000.00
            ]
        ];

        return $this->successResponse($analysis, 'Property AI analysis retrieved successfully');
    }

    // Mock handlers
    private function handleMockIndex(Request $request)
    {
        [$page, $perPage] = $this->getPaginationParams($request);
        $filters = $this->getFilterParams($request, [
            'city', 'state', 'zip', 'price_min', 'price_max', 'bedrooms', 
            'bathrooms', 'transaction_type', 'ai_score_min'
        ]);

        $result = $this->mockDataService->getProperties($filters, $page, $perPage);
        
        // According to API docs, properties list should just return data array without meta
        return $this->successResponse($result['data'], 'Properties retrieved successfully');
    }

    private function handleMockStore(Request $request)
    {
        try {
            $propertyData = array_merge($request->all(), [
                'user_id' => 1, // Mock user ID
                'ai_score' => rand(60, 100),
                'status' => 'draft',
                'view_count' => 0,
                'save_count' => 0,
                'inquiry_count' => 0,
                'created_at' => now()->format('Y-m-d\TH:i:s.u\Z'),
                'updated_at' => now()->format('Y-m-d\TH:i:s.u\Z'),
            ]);

            $property = $this->mockDataService->createProperty($propertyData);
            return $this->successResponse($property, 'Property created successfully', 201);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to create property');
        }
    }

    private function handleMockShow($id)
    {
        $property = $this->mockDataService->getProperty($id);

        if (!$property) {
            return $this->notFoundResponse('Property not found');
        }

        return $this->successResponse($property, 'Property retrieved successfully');
    }

    private function handleMockUpdate(Request $request, $id)
    {
        $property = $this->mockDataService->updateProperty($id, $request->all());

        if (!$property) {
            return $this->notFoundResponse('Property not found');
        }

        return $this->successResponse($property, 'Property updated successfully');
    }

    private function handleMockDestroy($id)
    {
        $deleted = $this->mockDataService->deleteProperty($id);

        if (!$deleted) {
            return $this->notFoundResponse('Property not found');
        }

        return $this->successResponse(null, 'Property deleted successfully');
    }

    private function handleMockAiAnalysis($id)
    {
        $analysis = $this->mockDataService->getPropertyAiAnalysis($id);

        if (!$analysis) {
            return $this->notFoundResponse('Property not found');
        }

        return $this->successResponse($analysis, 'Property AI analysis retrieved successfully');
    }
}
