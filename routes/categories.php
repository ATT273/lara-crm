<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  // Route::redirect('categories', '/categories');
  Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
  Route::get('categories/all', [CategoryController::class, 'getAll'])->name('categories.all');
  Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
  Route::get('categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
  Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
  Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
});
