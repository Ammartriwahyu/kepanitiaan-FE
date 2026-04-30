<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// TODO: Saat deploy, perlu dilakukan cron job untuk menjalankan schedule laravel
// * Open crontab: crontab -e
// * * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
Schedule::command('app:delete-old-data')->daily();