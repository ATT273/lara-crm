<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::prefix('products')->name('products.')->group(function () {
    // 🔍 Search - ĐẶT TRƯỚC tất cả routes khác
    Route::get('search', [ProductController::class, 'search'])->name('search');

    // 📋 List all products (nếu cần)
    Route::get('/', [ProductController::class, 'index'])->name('index');

    // ➕ Create new product
    Route::post('/', [ProductController::class, 'store'])->name('store');

    // 👁️ Show single product
    Route::get('{product}', [ProductController::class, 'show'])->name('show');

    // ✏️ Update product
    Route::put('{product}', [ProductController::class, 'update'])->name('update');
    Route::patch('{product}', [ProductController::class, 'update'])->name('patch');

    // 🗑️ Delete product
    Route::delete('{product}', [ProductController::class, 'destroy'])->name('destroy');
  });

  // Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  // Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
  // Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  // Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

  // Route::put('settings/password', [PasswordController::class, 'update'])
  //     ->middleware('throttle:6,1')
  //     ->name('user-password.update');

  // Route::get('settings/appearance', function () {
  //     return Inertia::render('settings/appearance');
  // })->name('appearance.edit');

  // Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
  //     ->name('two-factor.show');
});
