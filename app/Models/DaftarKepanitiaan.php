<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarKepanitiaan extends Model
{
    use HasFactory;

    protected $table = 'daftar_kepanitiaan';

    protected $fillable = [
        'nama',
        'nim',
        'prodi',
        'whatsapp',
        'link', 
        'kepanitiaan_id',
        'divisi_pilihan_satu_id', 
        'divisi_pilihan_dua_id',
        'status_kelulusan',
    ];

    public function kepanitiaan()
    {
        return $this->belongsTo(Kepanitiaan::class);
    }

    public function divisiSatu()
    {
        return $this->belongsTo(Divisi::class, 'divisi_pilihan_satu_id');
    }

    public function divisiDua()
    {
        return $this->belongsTo(Divisi::class, 'divisi_pilihan_dua_id');
    }

}