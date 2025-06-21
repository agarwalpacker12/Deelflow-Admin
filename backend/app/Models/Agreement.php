<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Agreement extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'type',
        'status',
        'document_template_name',
        'generated_document_path',
        'signature_provider_id',
        'parties_involved',
        'agreement_details',
    ];

    protected $casts = [
        'parties_involved' => 'array',
        'agreement_details' => 'array',
    ];

    /**
     * Get the offer associated with this agreement.
     */
    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }
}
