<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    use HasFactory;

    protected $table = 'divisis';

    protected $fillable = [
        'nama_divisi',
        'kepanitiaan_id',
    ];

    public function kepanitiaan()
    {
        return $this->belongsTo(Kepanitiaan::class);
    }

    public function daftarKepanitiaan()
    {
        return $this->belongsTo(DaftarKepanitiaan::class);
    }
}
