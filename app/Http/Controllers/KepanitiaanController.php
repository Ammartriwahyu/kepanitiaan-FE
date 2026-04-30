<?php

namespace App\Http\Controllers;

use App\Models\Divisi;
use App\Models\Kepanitiaan;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class KepanitiaanController extends Controller
{
    // Menampilkan list kepanitiaan namun jika tanggal kepanitiaan sudah lewat maka tidak akan di tampilkan
    public function indexUser()
    {
        $now = Carbon::now();
        $data = Kepanitiaan::where('tanggalBuka', '<=', $now)
                            ->where('tanggalTutup', '>=', $now)
                            ->get();

        return response()->json([
            'isSuccess' => true,
            'message' => 'List kepanitiaan yang sedang berlangsung',
            'data' => [
                'kepanitiaans' => $data,
            ]
        ]);
    }

    public function indexAdmin()
    {
        $data = Kepanitiaan::orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'isSuccess' => true,
            'message' => 'List kepanitiaan untuk admin',
            'data' => [
                'kepanitiaans' => $data,
            ]
        ]);
    }

    public function indexCreate()
    {
        return view("admin.kepanitiaan.create");
    }

    // masih opsional untuk melihat detail kepanitiaan
    public static function show($id)
    {
        $data = Kepanitiaan::with(['divisis'])->findOrFail($id);

        return response()->json([
            'isSuccess' => true,
            'message' => 'Detail kepanitiaan',
            'data' => [
                'kepanitiaan' => $data,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'nama' => 'required|string|max:255',
            'tanggalBuka' => 'required|date',
            'tanggalTutup' => 'required|date',
            'deskripsi' => 'nullable|string',
            'tanggal_pengumuman' => 'nullable|date_format:Y-m-d',
            'link_grup_whatsapp' => 'nullable|string',
            'divisi' => 'required|array|min:1',
            'divisi.*' => 'required|string|min:1',
        ]);

        // Filter out empty divisi
        $validate['divisi'] = array_filter($validate['divisi'], function($d) {
            return trim($d) !== '';
        });

        if (empty($validate['divisi'])) {
            return response()->json([
                'message' => 'Minimal harus ada 1 divisi',
                'errors' => ['divisi' => ['Minimal harus ada 1 divisi']]
            ], 422);
        }

        $kepanitiaan = Kepanitiaan::create([
            'nama' => $validate['nama'],
            'tanggalBuka' => $validate['tanggalBuka'],
            'tanggalTutup' => $validate['tanggalTutup'],
            'deskripsi' => $validate['deskripsi'] ?? null,
            'tanggal_pengumuman' => $validate['tanggal_pengumuman'] ?? null,
            'link_grup_whatsapp' => $validate['link_grup_whatsapp'] ?? null,
        ]);

        // Loop dan buat divisinya satu per satu
        foreach ($validate['divisi'] as $namaDivisi) {
            Divisi::create([
                'nama_divisi' => $namaDivisi,
                'kepanitiaan_id' => $kepanitiaan->id,
            ]);
        }

        return response()->json([
            'isSuccess' => true,
            'message' => 'Kepanitiaan berhasil dibuat',
            'data' => [
                'kepanitiaan' => $kepanitiaan->load('divisis'),
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'nama' => 'required|string|max:255',
            'tanggalBuka' => 'required|date',
            'tanggalTutup' => 'required|date',
            'deskripsi' => 'nullable|string',
            'tanggal_pengumuman' => 'nullable|date_format:Y-m-d',
            'link_grup_whatsapp' => 'nullable|string',
            'divisi' => 'required|array|min:1',
            'divisi.*' => 'required|string|min:1',
        ]);

        // Filter out empty divisi
        $validate['divisi'] = array_filter($validate['divisi'], function($d) {
            return trim($d) !== '';
        });

        if (empty($validate['divisi'])) {
            return response()->json([
                'message' => 'Minimal harus ada 1 divisi',
                'errors' => ['divisi' => ['Minimal harus ada 1 divisi']]
            ], 422);
        }

        // 1. Cari kepanitiaan yang akan diupdate
        $kepanitiaan = Kepanitiaan::findOrFail($id);

        // 2. Update data utama kepanitiaan
        $kepanitiaan->update([
            'nama' => $validate['nama'],
            'tanggalBuka' => $validate['tanggalBuka'],
            'tanggalTutup' => $validate['tanggalTutup'],
            'deskripsi' => $validate['deskripsi'] ?? null,
            'tanggal_pengumuman' => $validate['tanggal_pengumuman'] ?? null,
            'link_grup_whatsapp' => $validate['link_grup_whatsapp'] ?? null,
        ]);

        // 3. Sinkronisasi Divisi
        // Ambil nama divisi yang ada di database saat ini
        $divisiSaatIni = $kepanitiaan->divisis()->pluck('nama_divisi')->all();
    
        // Ambil nama divisi dari request
        $divisiBaru = $validate['divisi'];

        // Hapus divisi yang tidak ada lagi di request baru
        $divisiUntukDihapus = array_diff($divisiSaatIni, $divisiBaru);
        if (!empty($divisiUntukDihapus)) {
            $kepanitiaan->divisis()->whereIn('nama_divisi', $divisiUntukDihapus)->delete();
        }

        // Tambah divisi baru yang belum ada di database
        $divisiUntukDitambah = array_diff($divisiBaru, $divisiSaatIni);
        foreach ($divisiUntukDitambah as $namaDivisi) {
            $kepanitiaan->divisis()->create(['nama_divisi' => $namaDivisi]);
        }

        return response()->json([
            'isSuccess' => true,
            'message' => 'Kepanitiaan berhasil diupdate',
            'data' => [
                'kepanitiaan' => $kepanitiaan->load('divisis'),
            ]
        ]);
    }

    public function destroy($id)
    {
        $data = Kepanitiaan::findOrFail($id);

        if (!$data) {
            return response()->json([
                'isSuccess' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
        $data->delete();
        return response()->json([
            'isSuccess' => true,
            'message' => 'Kepanitiaan berhasil dihapus',
        ]);
    }
}