<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use App\Models\Aspiration;
use Carbon\Carbon;

#[Signature('app:delete-old-data')]
#[Description('Command description')]
class DeleteOldData extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $deleted = Aspiration::where('expired_at', '<', Carbon::now())->delete();
        $this->info("Deleted {$deleted} expired aspirations.");
    }
}
