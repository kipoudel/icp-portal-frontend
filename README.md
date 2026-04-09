# ICP Portal — Frontend

> A fully decoupled Vue 3 SPA for inventory and order management. Communicates with the Laravel API via token-based authentication.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Pinia |
| Data Fetching | TanStack Query (Vue Query) |
| HTTP Client | Axios |
| Routing | Vue Router 4 |
| Build Tool | Vite |

---

## Architecture Decisions

**Composition API (`<script setup>`)** — All components use the modern script setup syntax as required by the assessment brief.

**TanStack Query** — Handles all server state including caching, loading states, background revalidation, and cache invalidation after mutations. Eliminates manual loading/error state boilerplate.

**Pinia** — Manages global client state for authentication (token + user) and cart persistence across page navigation.

**Axios interceptors** — Automatically attaches the Bearer token to every outgoing request and redirects to login on any 401 response.

**Strict decoupling** — Zero Laravel/Blade dependency. Communicates purely via REST API. Can be hosted on any static hosting provider independently of the backend.

**Environment-based API URL** — `VITE_API_URL` drives the backend URL per environment. No hardcoded URLs anywhere in the codebase.

---

## Requirements

- Node.js 20+
- npm or pnpm
- Laravel API running locally or deployed (see backend repo)

---

## Local Setup

**1. Clone the repository**

```bash
git clone git@github.com:kipoudel/icp-portal-frontend.git
cd icp-portal-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment**

```bash
cp .env.example .env
```

Edit `.env` and set your Laravel API URL:

```env
VITE_API_URL=http://localhost:8000/api
```

**4. Start the dev server**

```bash
npm run dev
```

Visit `http://localhost:5173`

**5. Build for production**

```bash
npm run build
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Laravel API base URL | `http://localhost:8000/api` |

---

## Project Structure

src/
├── api/
│   ├── axios.ts            # Axios instance with auth interceptors
│   ├── auth.ts             # Login, logout, register, me
│   ├── products.ts         # Product CRUD + search/filter
│   ├── orders.ts           # Order creation and cancellation
│   └── categories.ts       # Category listing
│
├── components/
│   ├── AppLayout.vue       # Sidebar + navigation wrapper
│   ├── ProductCard.vue     # Product card with stock badge
│   └── Toast.vue           # Success / error notifications
│
├── pages/
│   ├── LoginPage.vue       # Centred login form with validation
│   ├── DashboardPage.vue   # Searchable, filterable product list
│   ├── CartPage.vue        # Cart review and order confirmation
│   └── OrdersPage.vue      # Order history with cancel action
│
├── router/
│   └── index.ts            # Route definitions + auth guards
│
├── stores/
│   ├── auth.ts             # Auth state, token, user
│   └── cart.ts             # Cart items, item count, total
│
└── types/
└── index.ts            # Shared TypeScript interfaces

---

## Features

### Authentication
- Token-based login via Laravel Sanctum
- Route guards on all protected pages
- Auto-redirect to login on expired or missing token
- Token persisted in `localStorage`

### Dashboard
- Searchable product list by name or SKU
- Filter by category via dropdown
- Real-time stock badges — green (≥5), amber (<5), red (0)
- Paginated results with previous/next navigation
- Add to cart with visual confirmation feedback

### Cart
- Add, remove, and adjust product quantities
- Real-time total price calculation
- Graceful 422 error handling for insufficient stock
- Redirects to order history on successful checkout

### Order History
- Full list of past orders with status badges
- Pending, completed, and cancelled states
- Cancel order with immediate UI update via query invalidation

---

## API Authentication

Every request is sent with:
  - Authorization: Bearer {token}
  - Content-Type: application/json
  - Accept: application/json

Token injection is handled automatically by the Axios request interceptor. A 401 response clears the stored token and redirects the user to `/login`.

---

## Deployment

Hosted on Railway. Deployed automatically on push to `main`.

### Railway Environment Variables

```env
VITE_API_URL=https://your-laravel-api.up.railway.app/api
```

### Build & Start Commands

  - Build:  npm install && npm run build
  - Start:  npx serve -s dist -l $PORT

---

## Backend Repository

The Laravel API is maintained in a separate repository.

👉 **[inventory-management-system-icp-portal](https://github.com/kipoudel/inventory-management-system-icp-portal)**

### Test Credentials

Email:     test@example.com
Password:  password

---