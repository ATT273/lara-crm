import {
  queryParams,
  type RouteDefinition,
  type RouteFormDefinition,
  type RouteQueryOptions,
} from "./../../wayfinder";
/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/users'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: index.url(options),
  method: "get",
});

index.definition = {
  methods: ["get", "head"],
  url: "/users",
} satisfies RouteDefinition<["get", "head"]>;

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/users'
 */
index.url = (options?: RouteQueryOptions) => {
  return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/products'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: index.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/products'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<"head"> => ({
  url: index.url(options),
  method: "head",
});

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/products'
 */
const indexForm = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: index.url(options),
  method: "get",
});

/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/products'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: index.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\UserController::index
 * @see app/Http/Controllers/UserController.php:14
 * @route '/products'
 */
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: index.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: "get",
});

index.form = indexForm;
/**
 * @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:32
 * @route '/products'
 */
export const store = (
  options?: RouteQueryOptions,
): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

store.definition = {
  methods: ["post"],
  url: "/users",
} satisfies RouteDefinition<["post"]>;

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:32
 * @route '/products'
 */
store.url = (options?: RouteQueryOptions) => {
  return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:32
 * @route '/products'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:32
 * @route '/products'
 */
const storeForm = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:32
 * @route '/products'
 */
storeForm.post = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: store.url(options),
  method: "post",
});

store.form = storeForm;
const users = {
  index: Object.assign(index, index),
  store: Object.assign(store, store),
};

export default users;
