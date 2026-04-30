<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    protected $fillable = ['nama'];
    public function posts()
    {
        return $this->hasMany(Post::class, 'post_category_id');
    }
    use HasFactory;

}
