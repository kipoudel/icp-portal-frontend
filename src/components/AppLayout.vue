<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

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
</script>

<template>
  <div class="min-h-screen bg-gray-950 flex">

    <aside class="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-full">
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

    <main class="flex-1 ml-64 p-8">
      <slot />
    </main>

  </div>
</template>