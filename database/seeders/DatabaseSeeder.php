<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'PIT',
            'email' => 'adminKbmdsi@gmail.com',
            'role' => 'superadmin',
            'password'  => Hash::make('PITGOKS123')
        ]);

        $this->call([
            KepanitiaanSeeder::class,
            DaftarKepanitiaanSeeder::class,
            AspirationSeeder::class,
        ]);
    }
}
