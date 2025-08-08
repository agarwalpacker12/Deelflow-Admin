<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\MockableController;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Validator;

class InvitationController extends Controller
{
    use MockableController;

    public function __construct()
    {
        $this->initializeMockDataService();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'role' => 'required|in:admin,staff',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $existingInvitation = Invitation::where('email', $request->email)->first();
        if($existingInvitation){
            return response()->json(['message' => 'An invitation has already been sent to this email address.'], 400);
        }
        $invitation = Invitation::create([
            'email' => $request->email,
            'role' => $request->role,
            'organization_id' => auth()->user()->organization_id,
            'token' => Invitation::generateToken(),
        ]);

        Mail::to($request->email)->send(new InvitationMail($invitation));

        return $this->successResponse([],'Invitation sent successfully.', 200);
    }

     public function validateToken(Request $request)
    {
        $token = $request->query('token');
        $invitation = Invitation::where('token', $token)->with('organization')
            ->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invalid or expired token'], 400);
        }

        return $this->successResponse([
            'email' => $invitation->email,
            'role' => $invitation->role,
            'organization' => $invitation->organization->only('id', 'name'),
        ],'Invitation validated successfully.', 200);
    }

}


