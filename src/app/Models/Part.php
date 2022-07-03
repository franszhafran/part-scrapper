<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $table = "part";

    public function kanban() {
        return $this->hasManyThrough(Kanban::class, KanbanPart::class, "id_part", "id_kanban", "id", "id");;
    }

    public function library() {
        return $this->hasOne(Library::class, "name", "part_name");
    }
}
