<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'priority',
        'assigned_user_id',
        'created_by',
        'updated_by',
        'project_id',
        'image_path',
        'assigned_user_id'
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function assignedBy() {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function createdBy() {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy() {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
