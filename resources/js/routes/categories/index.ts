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
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
export const all = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: all.url(options),
  method: "get",
});

all.definition = {
  methods: ["get", "head"],
  url: "/categories/all",
} satisfies RouteDefinition<["get", "head"]>;

/**
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
all.url = (options?: RouteQueryOptions) => {
  return all.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
all.get = (options?: RouteQueryOptions): RouteDefinition<"get"> => ({
  url: all.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
all.head = (options?: RouteQueryOptions): RouteDefinition<"head"> => ({
  url: all.url(options),
  method: "head",
});

/**
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
const allForm = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: all.url(options),
  method: "get",
});

/**
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: all.url(options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::all
 * @see app/Http/Controllers/CategoryController.php:122
 * @route '/categories/all'
 */
allForm.head = (options?: RouteQueryOptions): RouteFormDefinition<"get"> => ({
  action: all.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: "get",
});

all.form = allForm;
/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:71
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
 * @see app/Http/Controllers/CategoryController.php:71
 * @route '/categories'
 */
store.url = (options?: RouteQueryOptions) => {
  return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:71
 * @route '/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<"post"> => ({
  url: store.url(options),
  method: "post",
});

/**
 * @see \App\Http\Controllers\CategoryController::store
 * @see app/Http/Controllers/CategoryController.php:71
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
 * @see app/Http/Controllers/CategoryController.php:71
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
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
export const edit = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
): RouteDefinition<"get"> => ({
  url: edit.url(args, options),
  method: "get",
});

edit.definition = {
  methods: ["get", "head"],
  url: "/categories/{id}/edit",
} satisfies RouteDefinition<["get", "head"]>;

/**
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
edit.url = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { id: args };
  }

  if (Array.isArray(args)) {
    args = {
      id: args[0],
    };
  }

  args = applyUrlDefaults(args);

  const parsedArgs = {
    id: args.id,
  };

  return (
    edit.definition.url
      .replace("{id}", parsedArgs.id.toString())
      .replace(/\/+$/, "") + queryParams(options)
  );
};

/**
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
edit.get = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
): RouteDefinition<"get"> => ({
  url: edit.url(args, options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
edit.head = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
): RouteDefinition<"head"> => ({
  url: edit.url(args, options),
  method: "head",
});

/**
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
const editForm = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: edit.url(args, options),
  method: "get",
});

/**
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
editForm.get = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: edit.url(args, options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::edit
 * @see app/Http/Controllers/CategoryController.php:100
 * @route '/categories/{id}/edit'
 */
editForm.head = (
  args: { id: string | number } | [id: string | number] | string | number,
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: edit.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: "get",
});

edit.form = editForm;
/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
export const show = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteDefinition<"get"> => ({
  url: show.url(args, options),
  method: "get",
});

show.definition = {
  methods: ["get", "head"],
  url: "/categories/{category}",
} satisfies RouteDefinition<["get", "head"]>;

/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
show.url = (
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
    show.definition.url
      .replace("{category}", parsedArgs.category.toString())
      .replace(/\/+$/, "") + queryParams(options)
  );
};

/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
show.get = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteDefinition<"get"> => ({
  url: show.url(args, options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
show.head = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteDefinition<"head"> => ({
  url: show.url(args, options),
  method: "head",
});

/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
const showForm = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: show.url(args, options),
  method: "get",
});

/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
showForm.get = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: show.url(args, options),
  method: "get",
});
/**
 * @see \App\Http\Controllers\CategoryController::show
 * @see app/Http/Controllers/CategoryController.php:92
 * @route '/categories/{category}'
 */
showForm.head = (
  args:
    | { category: number | { id: number } }
    | [category: number | { id: number }]
    | number
    | { id: number },
  options?: RouteQueryOptions,
): RouteFormDefinition<"get"> => ({
  action: show.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options?.query ?? options?.mergeQuery ?? {}),
    },
  }),
  method: "get",
});

show.form = showForm;
/**
 * @see \App\Http\Controllers\CategoryController::update
 * @see app/Http/Controllers/CategoryController.php:108
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
 * @see app/Http/Controllers/CategoryController.php:108
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
 * @see app/Http/Controllers/CategoryController.php:108
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
 * @see app/Http/Controllers/CategoryController.php:108
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
 * @see app/Http/Controllers/CategoryController.php:108
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
  all: Object.assign(all, all),
  store: Object.assign(store, store),
  edit: Object.assign(edit, edit),
  show: Object.assign(show, show),
  update: Object.assign(update, update),
};

export default categories;
