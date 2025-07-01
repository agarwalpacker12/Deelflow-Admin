<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\MockableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    use MockableController;

    public function __construct()
    {
        $this->initializeMockDataService();
    }

    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'company_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|in:wholesaler,investor,funder,admin'
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($this->isMockEnabled()) {
            return $this->handleMockRegister($request);
        }

        // Real implementation
        try {
            $user = User::create([
                'uuid' => \Illuminate\Support\Str::uuid(),
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'company_name' => $request->company_name,
                'phone' => $request->phone,
                'role' => $request->role,
                'level' => 1,
                'points' => 0,
                'subscription_tier' => 'starter',
                'subscription_status' => 'active',
                'is_verified' => false,
                'is_active' => true,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->successResponse([
                'id' => $user->id,
                'uuid' => $user->uuid,
                'email' => $user->email,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'company_name' => $user->company_name,
                'phone' => $user->phone,
                'role' => $user->role,
                'level' => $user->level,
                'points' => $user->points,
                'subscription_tier' => $user->subscription_tier,
                'subscription_status' => $user->subscription_status,
                'is_verified' => $user->is_verified,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at->toISOString(),
                'updated_at' => $user->updated_at->toISOString()
            ], 'User registered successfully', 201);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Registration failed');
        }
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($this->isMockEnabled()) {
            return $this->handleMockLogin($request);
        }

        // Real implementation
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->unauthorizedResponse('Invalid credentials');
        }

        if (!$user->is_active) {
            return $this->forbiddenResponse('Account is deactivated');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Update last login
        $user->update(['last_login_at' => now()]);

        return $this->successResponse([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'uuid' => $user->uuid,
                'email' => $user->email,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'role' => $user->role
            ]
        ], 'User logged in successfully');
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        if ($this->isMockEnabled()) {
            return $this->successResponse(null, 'User logged out successfully');
        }

        $request->user()->currentAccessToken()->delete();

        return $this->successResponse(null, 'User logged out successfully');
    }

    /**
     * Get current user
     */
    public function me(Request $request)
    {
        if ($this->isMockEnabled()) {
            $user = $this->getCurrentMockUser($request);
            if (!$user) {
                return $this->unauthorizedResponse();
            }
            return $this->successResponse($user, 'User retrieved successfully');
        }

        return $this->successResponse($request->user(), 'User retrieved successfully');
    }

    /**
     * Handle mock registration
     */
    private function handleMockRegister(Request $request)
    {
        try {
            // Check if email already exists in mock data
            $existingUsers = $this->mockDataService->getUsers(['email' => $request->email]);
            if (!empty($existingUsers['data'])) {
                return $this->validationErrorResponse([
                    'email' => ['The email has already been taken.']
                ]);
            }

            $userData = [
                'email' => $request->email,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'company_name' => $request->company_name,
                'phone' => $request->phone,
                'role' => $request->role,
                'level' => 1,
                'points' => 0,
                'subscription_tier' => 'starter',
                'subscription_status' => 'active',
                'is_verified' => false,
                'is_active' => true,
                'created_at' => now()->format('Y-m-d\TH:i:s.u\Z'),
                'updated_at' => now()->format('Y-m-d\TH:i:s.u\Z'),
            ];

            $user = $this->mockDataService->createUser($userData);

            return $this->successResponse($user, 'User registered successfully', 201);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('Registration failed');
        }
    }

    /**
     * Handle mock login
     */
    private function handleMockLogin(Request $request)
    {
        $authResult = $this->authenticateMockUser($request->email, $request->password);
        
        if (!$authResult) {
            return $this->unauthorizedResponse('Invalid credentials');
        }

        $user = $authResult['user'];
        
        if (!$user['is_active']) {
            return $this->forbiddenResponse('Account is deactivated');
        }

        return $this->successResponse([
            'token' => $authResult['token'],
            'user' => [
                'id' => $user['id'],
                'uuid' => $user['uuid'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role']
            ]
        ], 'User logged in successfully');
    }
}
