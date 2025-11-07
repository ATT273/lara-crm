<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::table('products', function (Blueprint $table) {
      $table->text('tags')->nullable();   // lưu dạng JSON string
      $table->text('sizes')->nullable();
      $table->text('images')->nullable(); // [{name, url, id}]
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('products', function (Blueprint $table) {
      $table->dropColumn(['tags', 'sizes', 'images']);
    });
  }
};
