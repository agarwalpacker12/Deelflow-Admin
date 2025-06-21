<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_user_id',
        'address',
        'description',
        'price',
        'status',
        'property_details',
        'arv',
        'estimated_repairs',
    ];

    protected $casts = [
        'property_details' => 'array',
        'price' => 'decimal:2',
        'arv' => 'decimal:2',
        'estimated_repairs' => 'decimal:2',
    ];

    /**
     * Get the seller of the property.
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_user_id');
    }
}
