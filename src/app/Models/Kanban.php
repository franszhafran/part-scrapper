<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kanban extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $table = "kanban";

    public function parts() {
        return $this->hasManyThrough(Part::class, KanbanPart::class, "id_kanban", "id", "id", "id_part");
    }
}
