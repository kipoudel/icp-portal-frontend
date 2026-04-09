# ICP Portal — Frontend (Vue.js SPA)

A fully decoupled Single Page Application built with Vue 3, TypeScript, and Tailwind CSS for managing inventory and orders. Communicates with the Laravel API via token-based authentication.

---

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Pinia
- **Data Fetching**: TanStack Query (Vue Query)
- **HTTP Client**: Axios
- **Routing**: Vue Router 4
- **Build Tool**: Vite

---

## Architecture Decisions

- **Composition API (`<script setup>`)** — All components use the modern `<script setup>` syntax as required by the assessment
- **TanStack Query** — Handles all server state: caching, loading states, background revalidation, and cache invalidation after mutations. Avoids manual loading/error state management
- **Pinia** — Manages global client state for authentication (token + user) and cart persistence across navigation
- **Axios interceptors** — Automatically attaches Bearer token to every request and redirects to login on 401 responses
- **Strict decoupling** — No Laravel/Blade dependency. Communicates purely via REST API with Bearer token authentication
- **Environment-based API URL** — `VITE_API_URL` controls the backend URL per environment, no hardcoded URLs

---

## Requirements

- Node.js 20+
- npm or pnpm
- Laravel API running (see backend repo)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone git@github.com:kipoudel/icp-portal-frontend.git
cd icp-portal-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Update `.env` with your Laravel API URL:

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Start the development server

```bash
npm run dev
```

App is available at `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Laravel API base URL | `http://localhost:8000/api` |

---

## Project Structure