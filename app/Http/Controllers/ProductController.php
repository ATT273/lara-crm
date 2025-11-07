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
  public function index(Request $request)
  {
    $take = $request->input('take', 10);
    $page = $request->input('page', 1);

    $query = ProductModel::query();

    // name filter
    $query->when($request->filled('name'), function ($q) use ($request) {
      $q->where('name', 'like', '%' . $request->input('name') . '%');
    });

    // tag filter (tags is a JSON array)
    $query->when($request->filled('tag'), function ($q) use ($request) {
      $q->whereJsonContains('tags', $request->input('tag'));
    });

    // size filter
    $query->when($request->filled('size'), function ($q) use ($request) {
      $q->whereJsonContains('sizes', $request->input('size'));
    });

    // Sorting
    $query->when($request->filled('sort'), function ($q) use ($request) {
      $direction = $request->input('direction', 'asc');
      $q->orderBy($request->input('sort'), $direction);
    });

    // Cuối cùng paginate
    $products = $query->paginate($take, ['*'], 'page', $page);

    return Inertia::render('products/index', [
      'data' => [
        'data' => $products->items(),
        'meta' => [
          'page' => $products->currentPage(),
          'lastPage' => $products->lastPage(),
          'take' => $products->perPage(),
          'total' => $products->total(),
          'count' => $products->count(),
        ],
      ]
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
      'mainCategory' => 'required|numeric',
      'subCategory' => 'required|numeric',
      'price' => 'required|numeric|min:0',
      'cost' => 'required|numeric|min:0',
      'unit' => 'required|string|max:10',
      'tags' => 'nullable|array',
      'tags.*' => 'string|max:30',
      'sizes' => 'nullable|array',
      'sizes.*' => 'string|max:30',
      'images' => 'nullable|array',
      'images.*.id' => 'nullable|integer',
      'images.*.name' => 'required_with:images|string|max:255',
      'images.*.url' => 'required_with:images|string|max:500',
    ]);
    ProductModel::create($validated);
    return redirect()->route('products.index', [
      'page' => 1,
      'take' => 1,
    ])->with('message', 'Product created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(ProductModel $product)
  {
    return response()->json([
      "status" => 200,
      "message" => "Product fetched successfully",
      "code" => "PRODUCT_FETCHED_SUCCESSFULLY",
      "data" => $product
    ], 200);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(ProductModel $productModel)
  {
    // return product details for editing
    return Inertia::render('products/index', [
      'productDetails' => $productModel,
    ]);
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
