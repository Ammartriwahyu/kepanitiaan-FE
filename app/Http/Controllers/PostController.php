<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use App\Http\Resources\PostDetailResource;
use App\Services\SupabaseStorageService;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with(['postCategory', 'department']);


        if ($request->has('post_category_id') && $request->post_category_id != '') {
            $query->where('post_category_id', $request->post_category_id);
        }


        if ($request->has('department_id') && $request->department_id != '') {
            $query->where('department_id', $request->department_id);
        }


        if ($request->has('start_date') && $request->start_date != '') {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date != '') {
            $query->whereDate('created_at', '<=', $request->end_date);
        }


        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('subjudul', 'like', "%{$search}%");
            });
        }


        if ($request->has('sort_date') && $request->sort_date != '') {
            $sortOrder = $request->sort_date === 'newest' ? 'desc' : 'asc';
            $query->orderBy('created_at', $sortOrder);
        } else {
            $query->orderBy('created_at', 'desc');
        }


        $posts = $query->paginate(5);

        $postCategories = PostCategory::all();
        $departemen = Department::all();

        return response()->json([
            "isSuccess" => true,
            "data" => [
                'posts' => PostDetailResource::collection($posts),
                'postCategories' => $postCategories,
                'departemen' => $departemen
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $post_category = PostCategory::all();
        $departemen = Department::all();

        return response()->json([
            "isSuccess" => true,
            "data" => [
                'postCategories' => $post_category,
                'departemen' => $departemen
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'subjudul' => 'required|string|max:255',
            'isi' => 'required|string|min:1',
            'post_category_id' => 'required|integer|exists:post_categories,id',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'department_id' => 'required|integer|exists:departments,id',
        ]);


        if ($request->hasFile('gambar')) {
            $supabase = new SupabaseStorageService();
            $uploadedUrl = $supabase->upload($request->file('gambar'), 'informasi');

            if (!$uploadedUrl) {
                return back()->withErrors(['gambar' => 'Gagal mengupload gambar ke Supabase']);
            }

            $validated['gambar'] = $uploadedUrl;
        }

        Post::create($validated);

        return response()->json([
            "isSuccess" => true,
            "message" => "Post created successfully"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::findOrFail($id)->load(['postCategory', 'department']);
        return response()->json([
            "isSuccess" => true,
            "data" => new PostDetailResource($post)
        ]);

        // return view('admin.post.show', compact('post'));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $post = Post::findOrFail($id)->load(['postCategory', 'department']);

        $postCategories = PostCategory::all();
        $departemen = Department::all();

        return response()->json([
            "isSuccess" => true,
            "data" => [
                'post' => new PostDetailResource($post),
                'postCategories' => $postCategories,
                'departemen' => $departemen
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'subjudul' => 'required|string|max:255',
            'isi' => 'required|string|min:1',
            'post_category_id' => 'required|integer|exists:post_categories,id',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'department_id' => 'required|integer|exists:departments,id',
        ]);

        $post = Post::findOrFail($id);
        $supabase = new SupabaseStorageService();

        // Simpan URL gambar lama & baru
        $oldImageUrl = $post->gambar;
        $newImageUrl = null;

        try {
            DB::beginTransaction();

            if ($request->hasFile('gambar')) {
                $newImageUrl = $supabase->upload($request->file('gambar'), 'informasi');
                if (!$newImageUrl) {
                    return response()->json([
                        "isSuccess" => false,
                        "message" => "Gagal mengupload gambar ke Supabase"
                    ], 500);
                }

                $validated['gambar'] = $newImageUrl;

                if ($oldImageUrl && !$supabase->delete($oldImageUrl)) {
                    $supabase->delete($newImageUrl);
                    return response()->json([
                        "isSuccess" => false,
                        "message" => "Gagal menghapus gambar lama dari Supabase"
                    ], 500);
                }
            } else {
                $validated['gambar'] = $oldImageUrl;
            }

            $post->update($validated);

            DB::commit();

            return response()->json([
                "isSuccess" => true,
                "message" => "Post updated successfully"
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();

            if ($newImageUrl) {
                $supabase->delete($newImageUrl);
            }

            return response()->json([
                "isSuccess" => false,
                "message" => "An error occurred while updating the post: " . $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $supabase = new SupabaseStorageService();
        if ($post->gambar) {
            if (!$supabase->delete($post->gambar)) {
                return response()->json([
                    "isSuccess" => false,
                    "message" => "Gagal menghapus gambar dari Supabase"
                ], 500);
            } 
        }

        $post->delete();

        return response()->json([
            "isSuccess" => true,
            "message" => "Post deleted successfully"
        ]);
    }
}
