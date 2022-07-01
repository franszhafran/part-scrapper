<?php

use App\Http\Controllers\ImportController;
use App\Http\Controllers\KanbanController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post("/import-parts", [ImportController::class, "importPart"]);

Route::get("/kanban", [KanbanController::class, "index"]);
Route::get("/kanban/{id}", [KanbanController::class, "show"]);
