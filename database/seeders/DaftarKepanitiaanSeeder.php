<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DaftarKepanitiaan;
use App\Models\Kepanitiaan;
use App\Models\Divisi;

class DaftarKepanitiaanSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Ahmad Fauzi',
                'nim' => '225150400111001',
                'prodi' => 'Sistem Informasi',
                'whatsapp' => '081234567890',
                'link' => 'https://linkedin.com/in/ahmad',
                'kepanitiaan' => 'SOS 2026',
                'divisi1' => 'Acara',
                'divisi2' => 'Humas',
            ],
            [
                'nama' => 'Siti Nurhaliza',
                'nim' => '225150400111002',
                'prodi' => 'Sistem Informasi',
                'whatsapp' => '081234567891',
                'link' => 'https://linkedin.com/in/siti',
                'kepanitiaan' => 'UAS',
                'divisi1' => 'Publikasi',
                'divisi2' => 'Sponsor',
            ],
        ];

        foreach ($data as $item) {

            // ✅ ambil dari tabel kepanitiaan
            $kepanitiaan = Kepanitiaan::where('nama', $item['kepanitiaan'])->first();

            if (!$kepanitiaan) continue;

            $divisi1 = Divisi::where('nama_divisi', $item['divisi1'])
                ->where('kepanitiaan_id', $kepanitiaan->id)
                ->first();

            $divisi2 = Divisi::where('nama_divisi', $item['divisi2'])
                ->where('kepanitiaan_id', $kepanitiaan->id)
                ->first();

            if (!$divisi1 || !$divisi2) continue;

            // ✅ insert ke daftar_kepanitiaan
            DaftarKepanitiaan::create([
                'nama' => $item['nama'],
                'nim' => $item['nim'],
                'prodi' => $item['prodi'],
                'whatsapp' => $item['whatsapp'],
                'link' => $item['link'],
                'kepanitiaan_id' => $kepanitiaan->id,
                'divisi_pilihan_satu_id' => $divisi1->id,
                'divisi_pilihan_dua_id' => $divisi2->id,
            ]);
        }
    }
}
