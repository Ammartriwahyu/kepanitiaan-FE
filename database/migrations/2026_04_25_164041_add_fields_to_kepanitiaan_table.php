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
        Schema::table('kepanitiaan', function (Blueprint $table) {
            $table->text('deskripsi')->nullable()->comment('Deskripsi kepanitiaan');
            $table->dateTime('tanggal_pengumuman')->nullable()->comment('Tanggal pengumuman kelulusan');
            $table->string('link_grup_whatsapp')->nullable()->comment('Link grup WhatsApp untuk yang lulus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kepanitiaan', function (Blueprint $table) {
            $table->dropColumn(['deskripsi', 'tanggal_pengumuman', 'link_grup_whatsapp']);
        });
    }
};
