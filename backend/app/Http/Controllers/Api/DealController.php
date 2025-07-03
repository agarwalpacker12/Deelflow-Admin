<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Traits\MockableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DealController extends Controller
{
    use MockableController;

    public function __construct()
    {
        $this->initializeMockDataService();
    }

    /**
     * Display a listing of deals with filtering and pagination
     */
    public function index(Request $request)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockIndex($request);
        }

        // Real implementation
        [$page, $perPage] = $this->getPaginationParams($request);
        
        $query = Deal::with(['property', 'lead', 'wholesaler', 'buyer', 'seller']);

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('deal_type')) {
            $query->where('deal_type', $request->deal_type);
        }

        if ($request->has('closing_date_from')) {
            $query->where('closing_date', '>=', $request->closing_date_from);
        }

        if ($request->has('closing_date_to')) {
            $query->where('closing_date', '<=', $request->closing_date_to);
        }

        $deals = $query->paginate($perPage, ['*'], 'page', $page);

        return $this->successResponse([
            'data' => $deals->items(),
            'meta' => [
                'current_page' => $deals->currentPage(),
                'per_page' => $deals->perPage(),
                'total' => $deals->total(),
                'last_page' => $deals->lastPage(),
                'from' => $deals->firstItem(),
                'to' => $deals->lastItem(),
            ]
        ], 'Deals retrieved successfully');
    }

    /**
     * Store a newly created deal
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'lead_id' => 'nullable|exists:leads,id',
            'buyer_id' => 'nullable|exists:users,id',
            'seller_id' => 'nullable|exists:users,id',
            'deal_type' => 'required|in:assignment,double_close,wholesale,fix_flip',
            'purchase_price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'assignment_fee' => 'nullable|numeric|min:0',
            'contract_date' => 'required|date',
            'closing_date' => 'required|date|after:contract_date',
            'inspection_period' => 'nullable|integer|min:0',
            'earnest_money' => 'nullable|numeric|min:0',
            'contract_terms' => 'nullable|array',
            'contract_terms.financing_contingency' => 'nullable|boolean',
            'contract_terms.inspection_contingency' => 'nullable|boolean',
            'contract_terms.appraisal_contingency' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($this->isMockEnabled()) {
            return $this->handleMockStore($request);
        }

        // Real implementation
        try {
            $deal = Deal::create(array_merge($request->validated(), [
                'wholesaler_id' => auth()->id(),
                'uuid' => \Illuminate\Support\Str::uuid(),
                'status' => 'active'
            ]));

            $deal->load(['property', 'lead', 'wholesaler', 'buyer', 'seller']);

            return $this->successResponse($deal, 'Deal created successfully', 201);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to create deal');
        }
    }

    /**
     * Display the specified deal
     */
    public function show($id)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockShow($id);
        }

        // Real implementation
        $deal = Deal::with(['property', 'lead', 'wholesaler', 'buyer', 'seller', 'milestones'])->find($id);

        if (!$deal) {
            return $this->notFoundResponse('Deal not found');
        }

        return $this->successResponse($deal, 'Deal retrieved successfully');
    }

    /**
     * Update the specified deal
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'sometimes|exists:properties,id',
            'lead_id' => 'sometimes|exists:leads,id',
            'buyer_id' => 'sometimes|exists:users,id',
            'seller_id' => 'sometimes|exists:users,id',
            'deal_type' => 'sometimes|in:assignment,double_close,wholesale,fix_flip',
            'purchase_price' => 'sometimes|numeric|min:0',
            'sale_price' => 'sometimes|numeric|min:0',
            'assignment_fee' => 'sometimes|numeric|min:0',
            'contract_date' => 'sometimes|date',
            'closing_date' => 'sometimes|date',
            'inspection_period' => 'sometimes|integer|min:0',
            'earnest_money' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:active,pending,closed,cancelled',
            'contract_terms' => 'sometimes|array',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($this->isMockEnabled()) {
            return $this->handleMockUpdate($request, $id);
        }

        // Real implementation
        $deal = Deal::find($id);

        if (!$deal) {
            return $this->notFoundResponse('Deal not found');
        }

        try {
            $deal->update($request->validated());
            $deal->load(['property', 'lead', 'wholesaler', 'buyer', 'seller']);
            
            return $this->successResponse($deal, 'Deal updated successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to update deal');
        }
    }

    /**
     * Remove the specified deal
     */
    public function destroy($id)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockDestroy($id);
        }

        // Real implementation
        $deal = Deal::find($id);

        if (!$deal) {
            return $this->notFoundResponse('Deal not found');
        }

        try {
            $deal->delete();
            return $this->successResponse(null, 'Deal deleted successfully');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to delete deal');
        }
    }

    /**
     * Get milestones for a specific deal
     */
    public function milestones($id)
    {
        if ($this->isMockEnabled()) {
            return $this->handleMockMilestones($id);
        }

        // Real implementation
        $deal = Deal::with('milestones')->find($id);

        if (!$deal) {
            return $this->notFoundResponse('Deal not found');
        }

        return $this->successResponse($deal->milestones, 'Deal milestones retrieved successfully');
    }

    // Mock handlers
    private function handleMockIndex(Request $request)
    {
        [$page, $perPage] = $this->getPaginationParams($request);
        $filters = $this->getFilterParams($request, ['status', 'deal_type', 'closing_date_from', 'closing_date_to']);

        $result = $this->mockDataService->getDeals($filters, $page, $perPage);
        
        return response()->json($this->formatPaginatedResponse($result, 'Deals retrieved successfully'));
    }

    private function handleMockStore(Request $request)
    {
        try {
            $dealData = array_merge($request->all(), [
                'wholesaler_id' => 1, // Mock user ID
                'uuid' => \Illuminate\Support\Str::uuid(),
                'status' => 'active',
                'created_at' => now()->format('Y-m-d\TH:i:s.u\Z'),
                'updated_at' => now()->format('Y-m-d\TH:i:s.u\Z'),
            ]);

            $deal = $this->mockDataService->createDeal($dealData);
            return $this->successResponse($deal, 'Deal created successfully', 201);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Failed to create deal');
        }
    }

    private function handleMockShow($id)
    {
        $deal = $this->mockDataService->getDeal($id);

        if (!$deal) {
            return $this->notFoundResponse('Deal not found');
        }

        return $this->successResponse($deal, 'Deal retrieved successfully');
    }

    private function handleMockUpdate(Request $request, $id)
    {
        $deal = $this->mockDataService->updateDeal($id, $request->all());

        if (!$deal) {
            return $this->notFoundResponse('Deal not found');
        }

        return $this->successResponse($deal, 'Deal updated successfully');
    }

    private function handleMockDestroy($id)
    {
        $deleted = $this->mockDataService->deleteDeal($id);

        if (!$deleted) {
            return $this->notFoundResponse('Deal not found');
        }

        return $this->successResponse(null, 'Deal deleted successfully');
    }

    private function handleMockMilestones($id)
    {
        $milestones = $this->mockDataService->getDealMilestones($id);

        if ($milestones === null) {
            return $this->notFoundResponse('Deal not found');
        }

        return $this->successResponse($milestones, 'Deal milestones retrieved successfully');
    }
}
