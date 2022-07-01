<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kanban_part', function (Blueprint $table) {
            $table->foreignId("id_kanban")->references('id')->on('kanban');
            $table->foreignId("id_part")->references('id')->on('part');
            $table->unique(["id_kanban", "id_part"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kanban_parts');
    }
};
