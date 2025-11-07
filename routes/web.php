<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
  return Inertia::render('welcome', [
    'canRegister' => Features::enabled(Features::registration()),
  ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');
  // Route::get('products', function () {
  //   return Inertia::render('products');
  // })->name('products');
  // Route::get('user', function () {
  //   return Inertia::render('user');
  // })->name('user');
  // Route::get('inventories', function () {
  //   return Inertia::render('inventories');
  // })->name('inventories');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/products.php';
require __DIR__ . '/accounts.php';
