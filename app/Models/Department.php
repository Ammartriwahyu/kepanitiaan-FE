<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_department',
        'nama_singkat' 
        
    ];
    public function posts()
    {
        return $this->hasMany(Post::class, 'department_id');
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
