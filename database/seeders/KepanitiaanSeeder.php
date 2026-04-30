<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kepanitiaan;
use App\Models\Divisi;

class KepanitiaanSeeder extends Seeder
{
    public function run(): void
    {
        $kepanitiaans = [
            [
                'nama' => 'SOS 2026',
                'tanggalBuka' => '2026-02-01',
                'tanggalTutup' => '2026-08-15',
                'divisi' => [
                    'Acara',
                    'Humas',
                    'Konsumsi',
                    'Perlengkapan',
                    'Dokumentasi'
                ]
            ],
            [
                'nama' => 'UAS',
                'tanggalBuka' => '2026-04-01',
                'tanggalTutup' => '2026-04-29',
                'divisi' => [
                    'Acara',
                    'Publikasi',
                    'Sponsor',
                    'Keamanan'
                ]
            ],
            [
                'nama' => 'Seminar Nasional IT',
                'tanggalBuka' => '2026-07-01',
                'tanggalTutup' => '2026-07-10',
                'divisi' => [
                    'Acara',
                    'Moderator',
                    'Registrasi',
                    'Konsumsi'
                ]
            ],
        ];

        foreach ($kepanitiaans as $item) {
            $kepanitiaan = Kepanitiaan::create([
                'nama' => $item['nama'],
                'tanggalBuka' => $item['tanggalBuka'],
                'tanggalTutup' => $item['tanggalTutup'],
            ]);

            // insert divisi
            foreach ($item['divisi'] as $divisi) {
                Divisi::create([
                    'nama_divisi' => $divisi,
                    'kepanitiaan_id' => $kepanitiaan->id,
                ]);
            }
        }
    }
}
