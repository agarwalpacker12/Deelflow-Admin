<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'uuid',
    ];

    protected $casts = [
        'uuid' => 'string',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
