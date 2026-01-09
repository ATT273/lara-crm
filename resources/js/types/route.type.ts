import type {
  RouteDefinition,
  RouteFormDefinition,
  RouteQueryOptions,
} from "@/wayfinder";

/**
 * Generic route function interface for Wayfinder-generated routes
 * Represents a route that can be called with optional arguments and query options
 */
export interface IRoute<
  TArgs = void,
  TMethod extends "get" | "post" | "put" | "delete" | "patch" | "head" = "get",
> {
  /**
   * Main route function - returns a RouteDefinition with URL and method
   */
  (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ): RouteDefinition<TMethod>;

  /**
   * Route definition metadata containing methods and base URL
   */
  definition: RouteDefinition<TMethod[]>;

  /**
   * Generate the URL string for this route
   */
  url: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => string;

  /**
   * Form helper for generating HTML form actions
   */
  form: IRouteForm<TArgs, TMethod>;

  /**
   * HTTP method helpers (available methods depend on route definition)
   */
  get?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteDefinition<"get">;

  head?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteDefinition<"head">;

  post?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteDefinition<"post">;

  put?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteDefinition<"put">;

  patch?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteDefinition<"patch">;

  delete?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteDefinition<"delete">;
}

/**
 * Route form interface for generating HTML form elements
 */
export interface IRouteForm<TArgs = void, TMethod extends string = "get"> {
  /**
   * Main form function - returns a RouteFormDefinition with action and method
   */
  (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ): RouteFormDefinition<TMethod extends "get" | "post" ? TMethod : "post">;

  /**
   * HTTP method-specific form helpers
   */
  get?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteFormDefinition<"get">;

  head?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteFormDefinition<"get">;

  post?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteFormDefinition<"post">;

  put?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteFormDefinition<"post">;

  patch?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteFormDefinition<"post">;

  delete?: (
    ...args: TArgs extends void
      ? [options?: RouteQueryOptions]
      : [args: TArgs, options?: RouteQueryOptions]
  ) => RouteFormDefinition<"post">;
}

/**
 * Common route argument types for routes with URL parameters
 */

// For routes with a single numeric ID parameter (e.g., /products/{product})
export type RouteArgsWithId<TParamName extends string = "id"> = {
  [K in TParamName]: number | { id: number };
} | [number | { id: number }] | number | { id: number };

// For routes with a string or numeric parameter (e.g., /products/{product})
export type RouteArgsWithParam<TParamName extends string = "id"> =
  | { [K in TParamName]: string | number }
  | [string | number]
  | string
  | number;

/**
 * Generic route collection interface
 * Use this to type any route collection object (products, accounts, etc.)
 */
export interface IRouteCollection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: IRoute<any, any>;
}

/**
 * Example usage:
 *
 * // Single route
 * const indexRoute: IRoute<void, 'get'> = products.index;
 *
 * // Route with ID parameter
 * const showRoute: IRoute<RouteArgsWithId<'product'>, 'get'> = products.show;
 *
 * // Route with multiple methods
 * const updateRoute: IRoute<RouteArgsWithId<'product'>, 'put'> = products.update;
 *
 * // Type an entire route collection
 * const products: IRouteCollection = {
 *   search: Object.assign(search, search),
 *   index: Object.assign(index, index),
 *   store: Object.assign(store, store),
 *   show: Object.assign(show, show),
 *   update: Object.assign(update, update),
 *   destroy: Object.assign(destroy, destroy),
 * };
 */
