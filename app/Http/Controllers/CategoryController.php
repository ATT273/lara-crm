<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  { {
      $take = $request->input('take', 10);
      $page = $request->input('page', 1);

      $query = Category::query();

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
      $categories = $query->paginate($take, ['*'], 'page', $page);

      return Inertia::render('categories/index', [
        'data' => [
          'data' => $categories->items(),
          'meta' => [
            'page' => $categories->currentPage(),
            'lastPage' => $categories->lastPage(),
            'take' => $categories->perPage(),
            'total' => $categories->total(),
            'count' => $categories->count(),
          ],
        ]
      ]);
    }
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
      'parentId' => 'nullable|numeric',
    ]);
    Category::create($validated);
    return redirect()->route('categories.index', [
      'page' => 1,
      'take' => 10,
    ])->with('message', [
      'message' => 'Category created successfully.',
      'code' => 'CATEGORY_CREATED_SUCCESSFULLY',
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Category $category)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Category $category)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Category $category)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {
    //
  }
}
