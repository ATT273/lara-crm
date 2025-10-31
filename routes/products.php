<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  // Route::redirect('products', '/products');
  Route::get('products', [ProductController::class, 'index'])->name('products.index');
  Route::post('products', [ProductController::class, 'store'])->name('products.store');
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
