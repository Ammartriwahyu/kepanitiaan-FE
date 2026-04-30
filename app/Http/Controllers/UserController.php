<?php

namespace App\Http\Controllers;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\PostDetailResource;


class UserController extends Controller
{
    public function index()
    {
       
        $users = User::with('showRole')->get(); 
        return view('admin/user/lihatuser', ['users' => $users]);
    }
    public function addUser(Request $request)
    {   
        $nama = $request->input('nama');
        $nim = $request->input('nim');
        $email = $request->input('email');
        $password = Hash::make($request->input('password'));
        $role_id = $request->input('role');
        DB::statement('CALL add_user(?, ?, ?, ?, ?)', [
            $nama, $email, $nim, $password, $role_id
        ]);
        return redirect('/admin/users');
    }
    public function deleteUser($id)
    {
        DB::statement('CALL delete_user(?)', [$id]);
            return redirect('/admin/users');
    }
}
