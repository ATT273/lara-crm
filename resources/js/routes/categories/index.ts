import {
  applyUrlDefaults,
  queryParams,
  type RouteDefinition,
  type RouteFormDefinition,
  type RouteQueryOptions,
} from "./../../wayfinder";
/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: index.url(options),
  method: "get",
});

index.definition = {
  methods: ["get", "head"],
  url: "/categories",
} satisfies RouteDefinition<["get", "head"]>;

/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
 */
index.url = (options?: RouteQueryOptions) => {
  return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: index.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<"head"> => ({
  url: index.url(options),
  method: "head",
});

/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
 */
const indexForm = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: index.url(options),
  method: "get",
});

/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: index.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::index
 * @see app/Http/Controllers/CategoryController.php:14
 * @route '/categories'
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
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:32
 * @route '/categories'
 */
export const store = (
  options?: RouteQueryOptions,
): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

store.definition = {
  methods: ["post"],
  url: "/categories",
} satisfies RouteDefinition<["post"]>;

/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:32
 * @route '/categories'
 */
store.url = (options?: RouteQueryOptions) => {
  return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:32
 * @route '/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:32
 * @route '/categories'
 */
const storeForm = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:32
 * @route '/categories'
 */
storeForm.post = (
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: store.url(options),
  method: "post",
});

store.form = storeForm;

/**
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:127
 * @route '/categories/{category}'
 */
export const update = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteDefinition<"put"> => ({
  url: update.url(args, options),
  method: "put",
});

update.definition = {
  methods: ["put"],
  url: "/categories/{category}",
} satisfies RouteDefinition<["put"]>;

/**
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:127
 * @route '/categories/{category}'
 */
update.url = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { category: args };
  }

  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { category: args.id };
  }

  if (Array.isArray(args)) {
    args = {
      category: args[0],
    };
  }

  args = applyUrlDefaults(args);

  const parsedArgs = {
    category:
      typeof args.category === "object" ? args.category.id : args.category,
  };

  return (
    update.definition.url
      .replace("{category}", parsedArgs.category.toString())
      .replace(/\/+$/, "") + queryParams(options)
  );
};

/**
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:127
 * @route '/categories/{category}'
 */
update.put = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteDefinition<"put"> => ({
  url: update.url(args, options),
  method: "put",
});

/**
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:127
 * @route '/categories/{category}'
 */
const updateForm = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: "post",
});

/**
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:127
 * @route '/categories/{category}'
 */
updateForm.put = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteFormDefinition<"post"> => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: "post",
});

update.form = updateForm;
const categories = {
  index: Object.assign(index, index),
  store: Object.assign(store, store),
  update: Object.assign(update, update),
};

export default categories;
