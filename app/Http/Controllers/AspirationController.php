<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use App\Services\GeminiContentService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AspirationController extends Controller
{
    private $geminiService;

    public function __construct(GeminiContentService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    /**
     * Display the public aspiration page (server-side rendered).
     */
    public function publicIndex()
    {
        $aspirations = Aspiration::where('expired_at', '>', now())
            ->orderBy('created_at', 'desc')
            ->get();
 
        return Inertia::render('aspiration/Aspiration', [
            'aspirations' => $aspirations,
        ]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $aspiration = Aspiration::withTrashed()->latest('created_at')->get();

        return Inertia::render('admin/Aspiration', [
            'aspirations' => $aspiration
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'nama_pengirim' => 'max:100',
            'tujuan_aspirasi' => 'required|string|max:255',
            'pesan_aspirasi' => 'required|string',
        ]);

        // Moderation check
        $censorResult = $this->geminiService->censorText($validate['pesan_aspirasi']);

        // use text after censoring
        $validate['pesan_aspirasi'] = $censorResult['censored'] ?? $validate['pesan_aspirasi'];

        $aspiration = Aspiration::create([
            'nama_pengirim' => $validate['nama_pengirim'],
            'tujuan_aspirasi' => $validate['tujuan_aspirasi'],
            'pesan_aspirasi' => $validate['pesan_aspirasi'],
            'expired_at' => Carbon::now()->addDays(30),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Aspirasi berhasil ditambahkan',
            'data' => $aspiration
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if (!$request->user() || $request->user()->role !== 'superadmin') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $aspiration = Aspiration::withTrashed()->find($id);

        if (!$aspiration) {
            return response()->json([
                'success' => false,
                'message' => 'Aspiration not found'
            ], 404);
        }

        $aspiration->delete();

        return response()->json([
            'success' => true,
            'message' => 'Aspiration deleted successfully'
        ], 200);
    }
}
