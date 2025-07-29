<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'email',
        'role',
        'token',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public static function generateToken()
    {
        return Str::random(40);
    }
}
