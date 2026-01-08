<?php

namespace App\Http\Controllers;

use App\Models\Product as ProductModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

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
    ])->with('message', [
      'message' => 'Product created successfully.',
      'code' => 'PRODUCT_CREATED_SUCCESSFULLY',
    ]);
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
  public function update(Request $request, ProductModel $product)
  {
    $validated =  $request->validate([
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
    $product->update($validated);
    return redirect()->route('products.index', [
      'page' => 1,
      'take' => 5,
    ])->with('message', [
      'message' => 'Product updated successfully.',
      'code' => 'PRODUCT_UPDATED_SUCCESSFULLY',
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(ProductModel $productModel)
  {
    //
  }

  public function search(Request $request)
  {
    Log::info('🔥🔥🔥 SEARCH FUNCTION CALLED 🔥🔥🔥');
    Log::info('Request URL: ' . $request->fullUrl());
    try {
      // Validate request inputs
      $validated = $request->validate([
        'term' => 'nullable|string|max:255',
        'name' => 'nullable|string|max:255',
        'tag' => 'nullable|string|max:100',
        'size' => 'nullable|string|max:50',
        'mainCategory' => 'nullable|integer',
        'subCategory' => 'nullable|integer',
        'sort' => ['nullable', 'string', Rule::in(['name', 'price', 'created_at', 'updated_at'])],
        'direction' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
        'limit' => 'nullable|integer|min:1|max:100',
      ]);

      // Build query
      $query = ProductModel::query();

      // Search term (tìm kiếm chung)
      if (!empty($validated['term'])) {
        $term = $validated['term'];
        $query->where(function ($q) use ($term) {
          $q->where('name', 'like', "%{$term}%")
            ->orWhere('description', 'like', "%{$term}%");
        });
      }

      // Name filter (tìm kiếm theo tên cụ thể)
      if (!empty($validated['name'])) {
        $query->where('name', 'like', "%{$validated['name']}%");
      }

      // Tag filter (JSON contains)
      if (!empty($validated['tag'])) {
        $query->whereJsonContains('tags', $validated['tag']);
      }

      // Size filter (JSON contains)
      if (!empty($validated['size'])) {
        $query->whereJsonContains('sizes', $validated['size']);
      }
      // main category filter (JSON contains)
      if (!empty($validated['mainCategory'])) {
        $query->where('"mainCategory"', $validated['mainCategory']);
      }
      // sub category filter (JSON contains)
      if (!empty($validated['subCategory'])) {
        $query->where('"subCategory"', $validated['subCategory']);
      }

      // Sorting
      $sortField = $validated['sort'] ?? 'created_at';
      $sortDirection = $validated['direction'] ?? 'desc';
      $query->orderBy($sortField, $sortDirection);

      // Apply limit if specified
      $limit = $validated['limit'] ?? 10;
      $products = $query->limit($limit)->get();

      // Return consistent API response
      return $this->successResponse(
        data: $products,
        message: 'Products search results fetched successfully',
        code: 'PRODUCTS_SEARCH_RESULTS_FETCHED_SUCCESSFULLY'
      );
    } catch (\Exception $e) {
      Log::error('Product search error: ' . $e->getMessage());
      Log::error('Stack trace: ' . $e->getTraceAsString());

      return response()->json([
        'status' => 500,
        'message' => 'An error occurred while searching products',
        'code' => 'INTERNAL_SERVER_ERROR',
        'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
      ], 500);
    }
  }
  /**
   * Standard success response format
   * 
   * @param mixed $data
   * @param string $message
   * @param string $code
   * @param int $statusCode
   * @return JsonResponse
   */
  private function successResponse(
    mixed $data,
    string $message = 'Success',
    string $code = 'SUCCESS',
    int $statusCode = 200
  ): JsonResponse {
    return response()->json([
      'status' => $statusCode,
      'message' => $message,
      'code' => $code,
      'data' => $data,
    ], $statusCode);
  }
}
