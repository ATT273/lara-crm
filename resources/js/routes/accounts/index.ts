import {
  queryParams,
  type RouteDefinition,
  type RouteFormDefinition,
  type RouteQueryOptions,
} from "./../../wayfinder";
/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: index.url(options),
  method: "get",
});

index.definition = {
  methods: ["get", "head"],
  url: "/accounts",
} satisfies RouteDefinition<["get", "head"]>;

/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
 */
index.url = (options?: RouteQueryOptions) => {
  return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: index.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<"head"> => ({
  url: index.url(options),
  method: "head",
});

/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
 */
const indexForm = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: index.url(options),
  method: "get",
});

/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: index.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\AccountController::index
 * @see app/Http/Controllers/AccountController.php:14
 * @route '/accounts'
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
 * @see \App\Http\Controllers\AccountController::store
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
export const store = (
  options?: RouteQueryOptions,
): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

store.definition = {
  methods: ["post"],
  url: "/accounts",
} satisfies RouteDefinition<["post"]>;

/**
 * @see \App\Http\Controllers\AccountController::store
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
store.url = (options?: RouteQueryOptions) => {
  return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\AccountController::store
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\AccountController::store
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
const storeForm = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\AccountController::store
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
storeForm.post = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: store.url(options),
  method: "post",
});

store.form = storeForm;

/**
 * @see \App\Http\Controllers\AccountController::update
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
export const update = (
  userId: number | string,
  options?: RouteQueryOptions,
): RouteDefinition<"put"> => ({
  url: update.url(userId, options),
  method: "put",
});

update.definition = {
  methods: ["put"],
  url: "/accounts/:user",
} satisfies RouteDefinition<["put"]>;

/**
 * @see \App\Http\Controllers\AccountController::update
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
update.url = (userId: number | string, options?: RouteQueryOptions) => {
  return `/accounts/${userId}` + queryParams(options);
};

/**
 * @see \App\Http\Controllers\AccountController::update
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
update.put = (
  userId: number | string,
  options?: RouteQueryOptions,
): RouteDefinition<"put"> => ({
  url: update.url(userId, options),
  method: "put",
});

/**
 * @see \App\Http\Controllers\AccountController::update
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
const updateForm = (
  userId: number | string,
  options?: RouteQueryOptions,
): RouteFormDefinition<"put"> => ({
  action: update.url(userId, options),
  method: "put",
});

/**
 * @see \App\Http\Controllers\AccountController::update
 * @see app/Http/Controllers/AccountController.php:32
 * @route '/accounts'
 */
updateForm.put = (
  userId: number | string,
  options?: RouteQueryOptions,
): RouteFormDefinition<"put"> => ({
  action: update.url(userId, options),
  method: "put",
});
update.form = updateForm;
const accounts = {
  index: Object.assign(index, index),
  store: Object.assign(store, store),
  update: Object.assign(update, update),
};

export default accounts;
