<?php

namespace App\Models;

use App\Models\Timeline;
use App\Models\Department;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'judul',
        'subjudul',
        'isi',
        'post_category_id', 
        'gambar',
        'department_id',
        'user_id'
    ];
    public function postCategory()
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }

    /**
     * Get the user that owns the Post
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }
   

    
}

