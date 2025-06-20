<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Added this line
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'original_data',
        'status',
        'qualification_score',
        'lead_details',
        'assigned_to_user_id',
    ];

    protected $casts = [
        'original_data' => 'array', // Cast original_data to array
    ];

    /**
     * Get the user to whom the lead is assigned.
     */
    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to_user_id');
    }
}
