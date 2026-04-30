<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kepanitiaan extends Model
{
    use HasFactory;

    protected $table = 'kepanitiaan';

    protected $fillable = [
        'nama',
        'tanggalBuka',
        'tanggalTutup',
        'deskripsi',
        'tanggal_pengumuman',
        'link_grup_whatsapp',
    ];

    public function daftarKepanitiaan()
    {
        return $this->hasMany(DaftarKepanitiaan::class);
    }

    public function divisis()
    {
        return $this->hasMany(Divisi::class);
    }
}