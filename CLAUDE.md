# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Laravel 12 + React 19 CRM application** built with **Inertia.js** for seamless server-side routing with a client-side SPA experience. The application manages products, user accounts, and provides a complete authentication system with two-factor authentication.

## Commands

### Development

```bash
# Initial setup (installs dependencies, sets up .env, runs migrations, builds frontend)
composer setup

# Start development server (runs Laravel server, queue worker, and Vite dev server concurrently)
composer dev

# Start with SSR support
composer dev:ssr
```

### Testing

```bash
# Run all tests (Feature + Unit using Pest)
composer test

# Run specific test file
php artisan test --filter=ProductTest

# Run tests in specific suite
php artisan test tests/Feature
php artisan test tests/Unit
```

### Frontend

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Build with SSR support
npm run build:ssr

# Type checking (TypeScript)
npm run types

# Linting
npm run lint

# Code formatting
npm run format
npm run format:check
```

### Database

```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migration (drops all tables and re-migrates)
php artisan migrate:fresh

# Seed database
php artisan db:seed
```

### Code Quality

```bash
# Format PHP code with Laravel Pint
./vendor/bin/pint

# Format TypeScript/React code
npm run format
```

### Docker

```bash
# Start Laravel Sail (with PostgreSQL)
./vendor/bin/sail up -d

# Run commands inside Sail container
./vendor/bin/sail artisan migrate
./vendor/bin/sail composer install
./vendor/bin/sail npm run dev

# Standalone Dockerfile (for Render deployment)
docker build -t lara-crm .
docker run -p 10000:10000 lara-crm
```

## Architecture Overview

### Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 19 with TypeScript
- **Bridge:** Inertia.js 2.0 (server-driven client-side routing)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI primitives
- **Build Tool:** Vite 7
- **Testing:** Pest (PHP), ESLint/Prettier (JS/TS)
- **Database:** SQLite (dev) / PostgreSQL (production via Sail)

### Key Architectural Patterns

#### 1. **Inertia.js Page Components**

Pages in `resources/js/pages/` are automatically mapped to Laravel routes. Controllers render Inertia pages with:

```php
return Inertia::render('products/index', [
    'data' => $productsData
]);
```

Frontend pages receive props via `usePage<IPageProps<T>>()` hook.

#### 2. **Wayfinder - Type-Safe Routes**

The application uses **Laravel Wayfinder** to auto-generate TypeScript route helpers from Laravel routes. This provides:
- Type-safe URL generation from the frontend
- Auto-completion for route parameters and query strings
- Single source of truth (routes defined in PHP, consumed in TS)

Generated files in `resources/js/routes/` are used like:

```typescript
import products from '@/routes/products';
const url = products.index({ query: { page: 1, take: 10 } }).url;
```

**Important:** When modifying routes, Vite automatically regenerates TypeScript route definitions via the `@laravel/vite-plugin-wayfinder` plugin.

#### 3. **Shared Data Pattern**

The `HandleInertiaRequests` middleware shares data with all pages:
- `auth.user` - Current authenticated user
- `flash.message` - Flash messages from session (for CRUD confirmations)
- `sidebarOpen` - Sidebar state from cookie
- `name` - App name from config

This eliminates the need to explicitly pass authentication state on every request.

#### 4. **Layout Composition**

Pages wrap content with layouts:
- `AppLayout` - Main authenticated layout with breadcrumbs, sidebar, toast notifications
- `AuthLayout` - Authentication pages (login, register)
- `SettingsLayout` - Settings pages with sub-navigation

#### 5. **Pagination & Filtering Pattern**

Controllers follow a consistent pattern for list endpoints:
- Query params: `take` (limit), `page`, optional filters (`name`, `tag`, `size`)
- Response format:
  ```php
  [
      'data' => [
          'data' => $items->items(),
          'meta' => ['page', 'lastPage', 'take', 'total', 'count']
      ]
  ]
  ```

### Directory Structure

#### Backend (Laravel)

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── ProductController.php       # Product CRUD
│   │   ├── AccountController.php       # User account management
│   │   ├── DashboardController.php
│   │   └── Settings/                   # Profile, password, 2FA
│   ├── Middleware/
│   │   └── HandleInertiaRequests.php   # Shared props for all Inertia pages
│   └── Requests/
│       └── ProfileUpdateRequest.php
├── Models/
│   ├── User.php                        # Extended with roleCode, active status
│   └── Product.php                     # JSON casts: tags, sizes, images
└── Providers/

routes/
├── web.php                             # Main routes + home/dashboard
├── products.php                        # Product CRUD routes
├── accounts.php                        # Account management routes
└── settings.php                        # User settings routes

tests/
├── Feature/
│   ├── Auth/                           # Authentication tests (Fortify)
│   ├── Settings/                       # Profile, password, 2FA tests
│   └── DashboardTest.php
└── Unit/
```

#### Frontend (React/TypeScript)

```
resources/js/
├── pages/                              # Inertia page components (route-to-page mapping)
│   ├── products/index.tsx              # Product listing with filters
│   ├── accounts/index.tsx              # User account management
│   ├── auth/                           # Login, register, forgot password, etc.
│   ├── settings/                       # Profile, password, 2FA, appearance
│   ├── dashboard.tsx
│   └── welcome.tsx
├── components/
│   ├── products/                       # Product-specific components
│   ├── accounts/                       # Account table, dialogs
│   ├── ui/                             # Base Radix UI components
│   ├── custom-components/              # Project-specific reusable components
│   └── app-*                           # Layout components (header, sidebar)
├── layouts/
│   ├── app-layout.tsx                  # Main authenticated layout
│   ├── auth-layout.tsx                 # Auth pages layout
│   └── settings/                       # Settings-specific layouts
├── routes/                             # Auto-generated from Wayfinder (DO NOT EDIT)
│   ├── products/index.ts
│   ├── accounts/index.ts
│   └── ...
├── actions/                            # Auto-generated API helpers (DO NOT EDIT)
├── hooks/                              # Custom React hooks
│   ├── use-appearance.ts               # Theme management (light/dark)
│   ├── use-mobile.ts                   # Responsive breakpoint
│   └── use-two-factor-auth.ts
├── types/
│   ├── response.type.ts                # API response shapes
│   ├── product.type.ts
│   ├── account.type.ts
│   └── index.d.ts
├── constants/
│   ├── role.constants.ts               # ADMIN, MANAGER, SUPERVISOR, STAFF, USER
│   └── data.constants.ts
└── lib/                                # Utility functions
```

### Database Models

#### User Model
- Fields: `id`, `name`, `email`, `password`, `email_verified_at`
- Custom fields:
  - `roleCode` (string): ADMIN | MANAGER | SUPERVISOR | STAFF | USER
  - `active` (boolean): Account status
- Two-factor authentication columns (via Fortify)

#### Product Model
- Fields: `id`, `name`, `description`, `unit`
- Pricing: `price`, `cost` (decimal 10,2)
- Categories: `mainCategory`, `subCategory` (numeric IDs)
- JSON arrays: `tags`, `sizes`, `images` (cast to array automatically)

### Authentication

Built with **Laravel Fortify** providing:
- Login, registration, logout
- Password reset (email-based)
- Email verification
- Two-factor authentication (TOTP)
- Password confirmation for sensitive operations

All authentication routes are available at `/login`, `/register`, `/forgot-password`, etc.

### Role-Based Access Control

Simple role system via `roleCode` field on User model:
- **ADMIN** - Full system access
- **MANAGER** - Management-level access
- **SUPERVISOR** - Supervisory access
- **STAFF** - Standard staff access
- **USER** - Basic user access

Constants defined in `resources/js/constants/role.constants.ts` (frontend) and checked in controllers (backend).

## Common Development Workflows

### Adding a New Feature Module

1. **Create route file** in `routes/` (e.g., `routes/customers.php`)
2. **Register route file** in `routes/web.php`:
   ```php
   require __DIR__.'/customers.php';
   ```
3. **Create controller** in `app/Http/Controllers/`:
   ```php
   php artisan make:controller CustomerController
   ```
4. **Create model + migration**:
   ```php
   php artisan make:model Customer -m
   ```
5. **Create TypeScript types** in `resources/js/types/customer.type.ts`
6. **Create page component** in `resources/js/pages/customers/index.tsx`
7. **Add to sidebar navigation** in `resources/js/components/app-sidebar.tsx`

Wayfinder will automatically generate route helpers in `resources/js/routes/customers/` on next Vite dev server restart.

### Adding a New Form Field

When adding fields to Product, User, or other models:

1. **Create migration**:
   ```bash
   php artisan make:migration add_field_to_products_table
   ```
2. **Update model** `$fillable` array and `$casts` if needed
3. **Update Form Request validation** (if exists)
4. **Update TypeScript interface** in `resources/js/types/`
5. **Update form component** in `resources/js/components/`
6. **Update controller** to handle new field

### Working with Inertia Forms

Use Inertia's `useForm` hook for form handling:

```typescript
const { data, setData, post, processing, errors } = useForm({
  name: '',
  email: ''
});

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  post(products.store().url);
};
```

Validation errors from Laravel are automatically available in `errors` object.

### Testing Strategy

- **Feature Tests:** Test HTTP endpoints and Inertia page rendering
- **Unit Tests:** Test individual models, services, helpers
- All authentication flows are tested in `tests/Feature/Auth/`
- Use Pest's expectation API for cleaner test syntax

Example:
```php
test('users can view products', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->get(route('products.index'));

    $response->assertOk();
});
```

## Important Notes

### DO NOT Edit Auto-Generated Files

These directories are auto-generated by Wayfinder - modifications will be overwritten:
- `resources/js/routes/`
- `resources/js/actions/`

### Database Considerations

- **Development:** Uses SQLite (`database/database.sqlite`)
- **Testing:** Uses separate SQLite database (`database/testing.sqlite`)
- **Production (Sail):** Uses PostgreSQL in Docker container
- Ensure migrations are idempotent and include down() methods

### Frontend Build Process

- Vite automatically reloads on file changes in development
- TypeScript route definitions regenerate on route changes
- SSR mode requires separate build step: `npm run build:ssr`

### Docker Deployment

Two Docker configurations:
1. **Laravel Sail** (`compose.yaml`) - Full development environment with PostgreSQL
2. **Standalone Dockerfile** - Production-ready image for Render deployment (uses SQLite)

### Flash Messages

Use Laravel's flash messages for user feedback after CRUD operations:

```php
return redirect()->route('products.index')
    ->with('message', 'Product created successfully.');
```

Frontend automatically displays flash messages as toast notifications via `AppLayout`.
