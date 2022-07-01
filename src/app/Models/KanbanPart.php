<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KanbanPart extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    protected $table = "kanban_part";
}
