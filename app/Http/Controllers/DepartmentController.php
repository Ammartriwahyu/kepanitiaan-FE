<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function show($id)
    {
        // Kita cukup mengirimkan ID ke React. 
        // Logika pemilihan data dummy akan dilakukan di sisi Front-end.
        return Inertia::render('departments/Show', [
            'id' => (int) $id
        ]);
    }
}