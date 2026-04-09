<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import Toast from '@/components/Toast.vue'
import { useCartStore } from '@/stores/cart'
import { ordersApi } from '@/api/orders'

const cartStore = useCartStore()
const router = useRouter()

const loading = ref(false)
const toast = ref({ show: false, message: '', type: 'success' as 'success' | 'error' })

function showToast(message: string, type: 'success' | 'error') {
  toast.value = { show: true, message, type }
  setTimeout(() => toast.value.show = false, 3000)
}

async function checkout() {
  loading.value = true
  try {
    const items = cartStore.items.map(i => ({
      product_id: i.product.id,
      quantity: i.quantity,
    }))
    await ordersApi.create(items)
    cartStore.clearCart()
    showToast('Order placed successfully!', 'success')
    setTimeout(() => router.push('/orders'), 1500)
  } catch (e: any) {
    const message = e.response?.data?.message
      || e.response?.data?.errors?.items
      || 'Failed to place order. Please try again.'
    showToast(message, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLayout>
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-white">Your Cart</h1>
      <p class="text-gray-400 text-sm mt-1">Review your items before placing the order</p>
    </div>

    <div v-if="cartStore.items.length === 0" class="text-center py-20">
      <p class="text-5xl mb-4">🛒</p>
      <p class="text-gray-400">Your cart is empty.</p>
      <router-link to="/" class="mt-3 inline-block text-blue-400 text-sm hover:underline">
        Browse products
      </router-link>
    </div>

    <div v-else class="max-w-2xl">
      <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
        <div class="divide-y divide-gray-800">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="flex items-center gap-4 p-4"
          >
            <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
              <span class="text-xl">📦</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">{{ item.product.name }}</p>
              <p class="text-gray-500 text-xs">SKU: {{ item.product.sku }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="cartStore.updateQuantity(item.product.id, Math.max(1, item.quantity - 1))"
                class="w-7 h-7 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
              >-</button>
              <span class="text-white text-sm w-6 text-center">{{ item.quantity }}</span>
              <button
                @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                class="w-7 h-7 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
              >+</button>
            </div>
            <div class="text-right">
              <p class="text-white text-sm font-medium">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
              <p class="text-gray-500 text-xs">${{ Number(item.product.price).toFixed(2) }} each</p>
            </div>
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="text-gray-600 hover:text-red-400 transition-colors text-lg ml-2"
            >✕</button>
          </div>
        </div>

        <div class="border-t border-gray-800 p-4 flex items-center justify-between">
          <span class="text-gray-400 text-sm">Total ({{ cartStore.itemCount }} items)</span>
          <span class="text-white font-semibold text-lg">${{ cartStore.total.toFixed(2) }}</span>
        </div>
      </div>

      <div class="flex gap-3">
        <router-link
          to="/"
          class="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg text-sm text-center transition-colors"
        >
          Continue Shopping
        </router-link>
        <button
          @click="checkout"
          :disabled="loading"
          class="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition-colors"
        >
          {{ loading ? 'Placing Order...' : 'Confirm Order' }}
        </button>
      </div>
    </div>

    <Toast :show="toast.show" :message="toast.message" :type="toast.type" />
  </AppLayout>
</template>