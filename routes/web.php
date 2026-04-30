<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AspirationController;
use App\Http\Controllers\DepartmentController;
use App\Models\Kepanitiaan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/aspiration', [AspirationController::class, 'publicIndex'])->name('aspiration.index');

Route::get('/kegiatan', function () {
    $kepanitiaans = Kepanitiaan::where('tanggalBuka', '<=', now())
        ->where('tanggalTutup', '>=', now())
        ->orderBy('tanggalBuka', 'asc')
        ->get();

    return Inertia::render('kepanitiaan/Kegiatan', [
        'kepanitiaans' => $kepanitiaans,
    ]);
})->name('kegiatan.index');

Route::get('/kegiatan/{id}', function ($id) {
    $kepanitiaan = Kepanitiaan::with('divisis')->findOrFail($id);

    return Inertia::render('kepanitiaan/Detail', [
        'kepanitiaan' => $kepanitiaan,
    ]);
})->name('kegiatan.detail');

Route::get('/kegiatan/{id}/daftar', function ($id) {
    $kepanitiaan = Kepanitiaan::with('divisis')->findOrFail($id);

    return Inertia::render('kepanitiaan/Pendaftaran', [
        'kepanitiaan' => $kepanitiaan,
    ]);
})->name('kegiatan.pendaftaran');

Route::get('/kegiatan/{id}/pengumuman', function ($id) {
    $kepanitiaan = Kepanitiaan::findOrFail($id);

    return Inertia::render('kepanitiaan/Pengumuman', [
        'kepanitiaan' => $kepanitiaan,
    ]);
})->name('kegiatan.pengumuman');

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/aspiration', [AspirationController::class, 'index'])->name('admin.aspiration');

    Route::get('/announcement', function () {
        return Inertia::render('admin/Announcement');
    })->name('admin.announcement');

    Route::get('/committee', function () {
        return Inertia::render('admin/Committee');
    })->name('admin.committee');

    Route::get('/committee/{id}', function ($id) {
        return Inertia::render('admin/CommitteeDetail', ['committeeId' => $id]);
    })->name('admin.committee.detail');

    Route::get('/account', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/account', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/account', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/departments/{id}', [DepartmentController::class, 'show'])->name('departments.show');

require __DIR__ . '/auth.php';
