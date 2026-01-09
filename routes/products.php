<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::prefix('products')->name('products.')->group(function () {
    Route::get('search', [ProductController::class, 'search'])->name('search');
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::post('/', [ProductController::class, 'store'])->name('store');
    Route::get('{product}', [ProductController::class, 'show'])->name('show');
    Route::put('{product}', [ProductController::class, 'update'])->name('update');
    // Route::patch('{product}', [ProductController::class, 'update'])->name('patch');
    Route::delete('{product}', [ProductController::class, 'destroy'])->name('destroy');
  });
});
