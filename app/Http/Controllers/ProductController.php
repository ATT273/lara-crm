<?php

namespace App\Http\Controllers;

use App\Models\Product as ProductModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('products/index', [
      'products' => ProductModel::all(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'price' => 'required|numeric|min:0',
      'cost' => 'required|numeric|min:0',
      'unit' => 'required|string|max:10',
    ]);
    ProductModel::create($validated);
    return redirect()->route('products.index')->with('message', 'Product created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(ProductModel $productModel)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductModel $productModel)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, ProductModel $productModel)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductModel $productModel)
  {
    //
  }
}
