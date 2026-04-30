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
        Schema::create('aspiration', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pengirim', 100)->nullable();
            $table->string('tujuan_aspirasi', 100)->nullable();
            $table->text('pesan_aspirasi');
            $table->dateTime('expired_at')->default(now()->addDays(30));
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aspiration');
    }
};
