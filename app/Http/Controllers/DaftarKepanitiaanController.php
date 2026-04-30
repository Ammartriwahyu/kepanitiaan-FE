<?php

namespace App\Http\Controllers;

use App\Models\DaftarKepanitiaan;
use App\Models\Kepanitiaan;
use App\Services\UbauthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DaftarKepanitiaanController extends Controller
{
    /**
     * Store a new pendaftaran (gabungan Kepanitiaan & Staffmud).
     * 
     * Field order di form: nama, nim, prodi, pilsatu (divisi 1), pildua (divisi 2), whatsapp, link
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:255',
            'prodi' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:255',
            'link' => 'required|string',
            'kepanitiaan_id' => 'required|exists:kepanitiaan,id',
            'divisi_pilihan_satu_id' => 'required|exists:divisis,id',
            'divisi_pilihan_dua_id' => 'required|exists:divisis,id',
        ]);

        // pengecekan akun agar tidak double pendaftaran
        $alreadyRegistered = DaftarKepanitiaan::where('nim', $validate['nim'])
                                            ->where('kepanitiaan_id', $validate['kepanitiaan_id'])
                                            ->exists();

        if ($alreadyRegistered){
            return response()->json([
                'message' => 'Anda sudah terdaftar pada kepanitiaan ini',
            ], 409);
        }

        $data = DaftarKepanitiaan::create($validate);

        return response()->json([
            'message' => 'Anda Berhasil Daftar Kepanitiaan',
            'data' => $data,
        ], 201);
    }

    // nanti nya admin yang hanya bisa melihat pendaftar
    public function index($id)
    {
        $dataKepanitiaan = Kepanitiaan::findOrFail($id);

        $dataPendaftar = DaftarKepanitiaan::with(['kepanitiaan', 'divisiSatu', 'divisiDua'])
                                ->where('kepanitiaan_id', $id)
                                ->get();

        return response()->json([
            'message' => 'Data Pendaftar Kepanitiaan',
            'data' => [
                'kepanitiaan' => $dataKepanitiaan,
                'pendaftar' => $dataPendaftar
            ]
        ], 200);
    }

    // nanti nya admin yang hanya bisa hapus
    public function destroy($id)
    {
        $data = DaftarKepanitiaan::findOrFail($id);

        if (!$data) {
            return response()->json([
                'message' => 'Pendaftar Tidak Ditemukan',
            ], 404);
        }
        $data->delete();

        return response()->json([
            'message' => 'Pendaftar Berhasil Dihapus',
        ], 201);
    }

    // Update status kelulusan pendaftar
    public function updateStatus(Request $request, $id)
    {
        $validate = $request->validate([
            'status_kelulusan' => 'nullable|in:lulus,tidak_lulus',
        ]);

        $data = DaftarKepanitiaan::findOrFail($id);
        $data->update(['status_kelulusan' => $validate['status_kelulusan']]);

        return response()->json([
            'message' => 'Status kelulusan berhasil diupdate',
            'data' => $data,
        ], 200);
    }

    // login ub dan ambil data pendaftar sesuai kepanitiaan yang dipilih
    public function pendaftaranKepanitiaan(Request $request, $idKepanitiaan)
    {
        $ub = app(UbauthService::class);

        try {
            $mhs = AuthenticationController::ubAuth($request, $ub);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal melakukan autentikasi dengan UB, pastikan token yang diberikan benar.',
                'error' => $e->getMessage(),
            ], 401);
        }

        $dataKepanitiaan = KepanitiaanController::show($idKepanitiaan);

        return response()->json([
            'message' => 'Data Kepanitiaan',
            'data' => [
                'kepanitiaan' => $dataKepanitiaan->original['data'],
                'mahasiswa' => $mhs
            ],
        ], 200);
    }
}
