<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Dashboard', path: '/', icon: '▦' },
  { name: 'My Orders', path: '/orders', icon: '📋' },
  { name: 'Cart', path: '/cart', icon: '🛒' },
]

const isActive = (path: string) => route.path === path

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex">
    
    <!-- Mobile menu button -->
    <button
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white shadow-lg transition-colors"
      aria-label="Toggle menu"
    >
      <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Overlay for mobile -->
    <div
      v-if="isMobileMenuOpen"
      @click="closeMobileMenu"
      class="lg:hidden fixed inset-0 bg-black/50 z-30"
    ></div>

    <!-- Sidebar -->
    <aside
      class="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-full z-40 transition-transform duration-300"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="p-6 border-b border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">ICP</span>
          </div>
          <div>
            <p class="text-white font-semibold text-sm">ICP Portal</p>
            <p class="text-gray-500 text-xs">Inventory Management</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150"
          :class="isActive(item.path)
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'"
        >
          <span class="text-base">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
          <span
            v-if="item.name === 'Cart' && cartStore.itemCount > 0"
            class="ml-auto bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full"
          >
            {{ cartStore.itemCount }}
          </span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center gap-3 px-3 py-2 mb-2">
          <div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-medium">
              {{ authStore.user?.name?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium truncate">{{ authStore.user?.name }}</p>
            <p class="text-gray-500 text-xs truncate">{{ authStore.user?.email }}</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors duration-150"
        >
          <span>⬡</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 lg:ml-64 pt-16 lg:pt-0">
      <slot />
    </main>
  </div>
</template>
