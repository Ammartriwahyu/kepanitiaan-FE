<?php


namespace App\Http\Controllers;

use App\Models\Kepanitiaan;
use App\Models\User;
use App\Services\UbauthService;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class AuthenticationController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password_hash)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        return $user->createToken($request->email)->plainTextToken;
    }
    public function logout(Request $request){

        $request->user()->tokens()->delete();
    }
    public function getUser(Request $request){

        return response()->json(Auth::user());
    }

    public function register(Request $request) {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'nim' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'nim' => $request->nim,
            'password_hash' => Hash::make($request->password),
            'role_id' => 2,
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public static function ubAuth(Request $request, UbauthService $ub)
    {

        try {
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string|min:8',
            ]);
            $res = $ub->auth($request->username, $request->password);
            return $res;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
