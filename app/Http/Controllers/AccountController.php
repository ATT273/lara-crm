<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{

  /**
   * Display accounts list page
   */
  public function index(Request $request)
  {
    $take = $request->input('take', 10);
    $page = $request->input('page', 1);

    $query = User::query();

    // name filter
    $query->when($request->filled('name'), function ($q) use ($request) {
      $q->where('name', 'like', '%' . $request->input('name') . '%');
    });

    // Sorting
    $query->when($request->filled('sort'), function ($q) use ($request) {
      $direction = $request->input('direction', 'asc');
      $q->orderBy($request->input('sort'), $direction);
    });

    // Cuối cùng paginate
    $accounts = $query->paginate($take, ['*'], 'page', $page);

    return Inertia::render('accounts/index', [
      'data' => [
        'data' => $accounts->items(),
        'meta' => [
          'page' => $accounts->currentPage(),
          'lastPage' => $accounts->lastPage(),
          'take' => $accounts->perPage(),
          'total' => $accounts->total(),
          'count' => $accounts->count(),
        ],
      ]
    ]);
  }

  /**
   * Assign user role.
   */
  public function assignRole(Request $request, User $user)
  {
    $validated = $request->validate([
      'roleCode' => 'required|string',
      'active' => 'required|boolean',
    ]);
    $user->update($validated);
    return redirect()->route('accounts.index', [
      'page' => 1,
      'take' => 1,
    ])->with('message', 'Account updated successfully.');
  }

  public function update(Request $request, User $user)
  {
    $validated =  $request->validate([
      'name' => 'required|string|max:255',
      'roleCode' => 'required|string',
      'active' => 'required|boolean',
    ]);
    $user->update($validated);
    return redirect()->route('accounts.index', [
      'page' => 1,
      'take' => 1,
    ])->with('message', [
      'message' => 'Account updated successfully.',
      'code' => 'ACCOUNT_UPDATED_SUCCESSFULLY',
    ]);
  }
}
