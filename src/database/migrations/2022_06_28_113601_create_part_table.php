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
        Schema::create('part', function (Blueprint $table) {
            $table->id();
            $table->string("number");
            $table->string("name");
            $table->string("sym_part")->nullable();
            $table->integer("qty");
            $table->string("spare")->nullable();
            $table->string("material")->nullable();
            $table->string("remark")->nullable();
            $table->string("check")->nullable();
            $table->string("rev")->nullable();
            $table->integer("price")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('part');
    }
};
