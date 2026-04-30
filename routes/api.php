<?php

use App\Http\Controllers\AspirationController;
use App\Http\Controllers\DaftarKepanitiaanController;
use App\Http\Controllers\DaftarKepanitiaanExportController;
use App\Http\Controllers\KepanitiaanController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    
    Route::prefix('posts')->group(function () {
        Route::get('/', [PostController::class, 'index']);
        Route::get('/{id}', [PostController::class, 'show']);
        Route::post('/', [PostController::class, 'store']);
        Route::put('/{id}', [PostController::class, 'update']);
        Route::delete('/{id}', [PostController::class, 'destroy']);
    });

    Route::prefix('kepanitiaan')->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/admin', [KepanitiaanController::class, 'indexAdmin']);
            Route::post('/', [KepanitiaanController::class, 'store']);
            Route::put('/{id}', [KepanitiaanController::class, 'update']);
            Route::delete('/{id}', [KepanitiaanController::class, 'destroy']);
        });
        
        Route::get('/', [KepanitiaanController::class, 'indexUser']);
        Route::get('/{id}', [KepanitiaanController::class, 'show']);
        Route::get('/export/{id}', [DaftarKepanitiaanExportController::class, 'export']);
        
    });

    Route::group(['prefix' => 'daftar-kepanitiaan'], function () {
        Route::post('/login/{id}', [\App\Http\Controllers\DaftarKepanitiaanController::class, 'pendaftaranKepanitiaan']);
        Route::post('/', [\App\Http\Controllers\DaftarKepanitiaanController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\DaftarKepanitiaanController::class, 'index']);
        Route::put('/{id}/status', [\App\Http\Controllers\DaftarKepanitiaanController::class, 'updateStatus']);
        Route::delete('/{id}', [\App\Http\Controllers\DaftarKepanitiaanController::class, 'destroy']);
    });

    Route::prefix('aspiration')->group(function () {
        Route::post('/', [AspirationController::class, 'store']);
        Route::get('/', [AspirationController::class, 'index']);
        Route::delete('/{id}', [AspirationController::class, 'destroy']);
    });
});