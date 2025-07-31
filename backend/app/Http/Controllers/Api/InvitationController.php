<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Validator;

class InvitationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'role' => 'required|in:admin,staff',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $invitation = Invitation::create([
            'email' => $request->email,
            'role' => $request->role,
            'organization_id' => auth()->user()->organization_id,
            'token' => Invitation::generateToken(),
        ]);

        Mail::to($request->email)->send(new InvitationMail($invitation));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }
}
