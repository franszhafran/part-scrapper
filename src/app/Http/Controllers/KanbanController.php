<?php

namespace App\Http\Controllers;

use App\Models\Kanban;
use App\Models\Library;
use App\Models\Part;
use Illuminate\Http\Request;

class KanbanController extends Controller
{
    public function index(Request $request) {
        $kanban = Kanban::all();

        return $this->sendData($kanban);
    }

    public function show($id) {
        $kanban = Kanban::with(["parts", "parts.library"])->where("id", $id)->get();
        
        return $this->sendData($kanban);
    }

    public function library() {
        $library = Library::all();
        
        return $this->sendData($library);
    }
}
