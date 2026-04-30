<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontEndController extends Controller
{
   public function home()
   {
       $latestPosts = Post::with(['department', 'postCategory'])
           ->orderBy('created_at', 'desc')
           ->take(3)
           ->get();

       return Inertia::render('LandingPage', [
           'latestPosts' => $latestPosts,
       ]);
   }
   public function showDepartemen ($id)
   {
   
    return Inertia::render('Departemen',[
        'id'=>$id
    ]);

   } 
   public function showKomisi ($id)
   {
   
    return Inertia::render('Komisi',[
        'id'=>$id
    ]);

   } 
   public function showStat()
{
    $postStatsByCategory = PostCategory::withCount('posts')->get();
    $postStatsByDepartment = Department::withCount('posts')->get();

    return Inertia::render('Dashboard', [
        'postStatsByCategory' => $postStatsByCategory,
        'postStatsByDepartment' => $postStatsByDepartment,
    ]);
}


   public function informasi(Request $request)
   {
    $categoryName = $request->query('category');
    $postsQuery = Post::orderBy('created_at', 'desc')->with('department', 'postCategory');

    if ($categoryName) {
        $postsQuery->whereHas('postCategory', function($query) use ($categoryName) {
            $query->where('nama', $categoryName);
        });
    }

    $posts = $postsQuery->paginate(6)->withQueryString();
    $categories = PostCategory::all();

    return Inertia::render('InformasiPage', [
        'posts' => $posts,
        'categories' => $categories,
        'currentFilter' => $categoryName,
    ]);
   }
   public function detailInformasi($id)
{
    
    $post = Post::findOrFail($id)->load(['postCategory', 'department']);

  
    $suggestionPosts = Post::with(['department', 'postCategory'])
                           ->where('id', '!=', $post->id)
                           ->orderBy('created_at', 'desc')
                           ->take(10)
                           ->get();


    return Inertia::render('DetailInformasi', [
        'post' => $post,
        'suggestionPosts' => $suggestionPosts
    ]);
}

}
