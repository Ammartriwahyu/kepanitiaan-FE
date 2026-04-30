<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ "Keluarga Besar Mahasiswa Departemen Sistem Informasi 2026" }}</title>

        <meta property="og:description" content="KBMDSI adalah sebuah organisasi himpunan yang merupakan gabungan dari 3 program studi Fakultas Ilmu Komputer Universitas Brawijaya, yakni Sistem Informasi, Teknologi Informasi, dan Pendidikan Teknologi Informasi. KBMDSI terdiri atas EMDSI yang memiliki 6 Departemen dan BPMDSI yang memiliki 2 Komisi, dimana setiap Departemen/Komisi memiliki tugas dan tanggung-jawabnya masing-masing." />
        <meta name="twitter:description" content="KBMDSI adalah sebuah organisasi himpunan yang merupakan gabungan dari 3 program studi Fakultas Ilmu Komputer Universitas Brawijaya, yakni Sistem Informasi, Teknologi Informasi, dan Pendidikan Teknologi Informasi. KBMDSI terdiri atas EMDSI yang memiliki 6 Departemen dan BPMDSI yang memiliki 2 Komisi, dimana setiap Departemen/Komisi memiliki tugas dan tanggung-jawabnya masing-masing." />
        
        <link rel="canonical" href="https://kbmdsi.ub.ac.id/" />
        
        <meta name="author" content="Keluarga Besar Mahasiswa Departemen Sistem Informasi" />
        <meta name="keywords" content="Keluarga Besar Mahasiswa Departemen Sistem Informasi, KBMDSI, FILKOM, Fakultas Ilmu Komputer, Univesitas Brawijaya" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
