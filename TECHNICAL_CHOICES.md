# Technical Choices

## Framework & Language

**Vue 3 with Composition API (`<script setup>`)**
- Modern, performant, and explicitly required by the assessment brief
- Composition API provides better TypeScript integration and code reusability through composables
- `<script setup>` reduces boilerplate and improves developer experience

**TypeScript**
- Catches errors at compile-time, reducing runtime bugs in production
- Provides excellent IDE autocomplete and refactoring support
- Essential for maintaining code quality in a growing codebase

## State Management

**Pinia**
- Official Vue state management solution, replacing Vuex
- Simpler API with better TypeScript support than Vuex
- Used for authentication state (token, user) and cart persistence
- Lightweight and tree-shakable

**TanStack Query (Vue Query)**
- Eliminates manual loading/error state management
- Automatic background refetching keeps data fresh
- Built-in caching reduces unnecessary API calls
- Optimistic updates and cache invalidation after mutations
- Industry standard for server state management (used by Netflix, Google, etc.)

## HTTP & API Communication

**Axios**
- More feature-rich than native `fetch()` (interceptors, automatic JSON parsing)
- Request interceptor automatically attaches Bearer token to all API calls
- Response interceptor handles 401 errors globally, redirecting to login
- Better error handling and request/response transformation

## Styling

**Tailwind CSS v4**
- Utility-first approach enables rapid UI development
- Smaller bundle size than traditional CSS frameworks
- Consistent design system through configuration
- Excellent dark mode support (used throughout the app)
- No CSS naming conflicts or specificity issues

## Build Tool

**Vite**
- Lightning-fast HMR (Hot Module Replacement) during development
- Optimized production builds using Rollup
- Native ESM support
- Official recommendation from Vue team
- Significantly faster than webpack-based Vue CLI

## Routing

**Vue Router 4**
- Official routing solution for Vue 3
- Type-safe route definitions
- Navigation guards for authentication protection
- Lazy-loaded route components for better performance

## Architecture Patterns

**Fully Decoupled SPA**
- Complete separation from Laravel backend enables independent deployment
- Frontend can be hosted on any static hosting (Railway, Vercel, Netlify)
- Backend can scale independently
- Easier to maintain and test in isolation

**Token-Based Authentication**
- Stateless authentication suitable for SPAs
- Token stored in Pinia with localStorage persistence
- Automatic injection via Axios interceptors
- Secure and scalable approach

**Centralized API Client**
- Single Axios instance (`src/lib/axios.ts`) ensures consistent configuration
- All API calls go through one place, making debugging easier
- Easy to add global error handling or logging

**Composables Pattern**
- Reusable logic extracted into composables (following Vue best practices)
- Better code organization and testability
- Examples: `useAuth`, `useCart` (if implemented)

## Why Not Alternatives?

**Redux/Vuex** → Pinia is simpler and officially recommended for Vue 3

**REST Client Libraries (e.g., Axios alternatives)** → Axios is battle-tested with excellent interceptor support

**Component Libraries (Vuetify, Element Plus)** → Tailwind provides more flexibility and smaller bundle size for custom designs

**Webpack** → Vite offers superior developer experience with faster builds

**Options API** → Composition API required by assessment and provides better TypeScript support

---

This stack prioritizes **developer experience**, **performance**, and **maintainability** while following Vue 3 best practices and modern frontend standards.