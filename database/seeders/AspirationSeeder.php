<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Aspiration;

class AspirationSeeder extends Seeder
{
    public function run(): void
    {
        $aspirasi = [
            [
                'nama_pengirim' => 'John Doe',
                'tujuan_aspirasi' => 'Peningkatan Fasilitas Kampus',
                'pesan_aspirasi' => 'Saya berharap kampus dapat meningkatkan fasilitas seperti ruang belajar, perpustakaan, dan area rekreasi untuk mendukung kegiatan mahasiswa.'
            ],
            [
                'nama_pengirim' => '',
                'tujuan_aspirasi' => 'Kegiatan Ekstrakurikuler',
                'pesan_aspirasi' => 'Saya ingin melihat lebih banyak kegiatan ekstrakurikuler yang beragam dan menarik untuk mahasiswa agar dapat mengembangkan minat dan bakat mereka.'
            ],
            [
                'nama_pengirim' => 'Alice Johnson',
                'tujuan_aspirasi' => 'Kualitas Makanan di Kantin',
                'pesan_aspirasi' => 'Saya berharap kantin kampus dapat menyediakan makanan yang lebih sehat, lezat, dan terjangkau bagi mahasiswa.'
            ],
        ];

        foreach ($aspirasi as $item) {
            Aspiration::create($item);
        }
    }
}
