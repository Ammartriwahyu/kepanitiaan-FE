<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aspiration extends Model
{
    use SoftDeletes;

    protected $table = 'aspiration';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'nama_pengirim',
        'tujuan_aspirasi',
        'pesan_aspirasi',
        'expired_at'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'expired_at' => 'datetime:Y-m-d H:i:s',
    ];
}
