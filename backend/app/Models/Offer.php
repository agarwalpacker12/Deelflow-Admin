<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'buyer_user_id',
        'offer_amount',
        'status',
        'message',
        'terms',
    ];

    protected $casts = [
        'terms' => 'array',
        'offer_amount' => 'decimal:2',
    ];

    /**
     * Get the property for which the offer is made.
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the user who made the offer.
     */
    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_user_id');
    }
}
