<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daftar_kepanitiaan', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nim');
            $table->string('prodi');
            $table->string('whatsapp');
            $table->string('link');
            $table->foreignId('divisi_pilihan_satu_id')->constrained('divisis')->onDelete('cascade');
            $table->foreignId('divisi_pilihan_dua_id')->constrained('divisis')->onDelete('cascade');
            $table->foreignId('kepanitiaan_id')->constrained('kepanitiaan')->onDelete('cascade');
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daftar_kepanitiaan');
    }
};
