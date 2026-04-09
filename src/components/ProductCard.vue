<script setup lang="ts">
import type { Product } from '@/types'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()
const added = ref(false)

function addToCart() {
  cartStore.addToCart(props.product)
  added.value = true
  setTimeout(() => added.value = false, 1500)
}

const stockStatus = (qty: number) => {
  if (qty === 0) return { label: 'Out of Stock', class: 'bg-red-500/10 text-red-400 border-red-500/20' }
  if (qty < 5) return { label: `Low Stock (${qty})`, class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' }
  return { label: `In Stock (${qty})`, class: 'bg-green-500/10 text-green-400 border-green-500/20' }
}
</script>

<template>
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-4 hover:border-gray-700 transition-colors duration-150">

    <div class="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
      <span class="text-4xl">📦</span>
    </div>

    <div class="flex-1">
      <div class="flex items-start justify-between gap-2 mb-1">
        <h3 class="text-white font-medium text-sm leading-tight">{{ product.name }}</h3>
        <span
          class="shrink-0 text-xs border px-2 py-0.5 rounded-full"
          :class="stockStatus(product.stock_quantity).class"
        >
          {{ stockStatus(product.stock_quantity).label }}
        </span>
      </div>
      <p class="text-gray-500 text-xs mb-1">SKU: {{ product.sku }}</p>
      <p class="text-xs text-gray-600">{{ product.category?.name }}</p>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-white font-semibold">${{ Number(product.price).toFixed(2) }}</span>
      <button
        @click="addToCart"
        :disabled="product.stock_quantity === 0"
        class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150"
        :class="added
          ? 'bg-green-600 text-white'
          : product.stock_quantity === 0
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 text-white'"
      >
        {{ added ? '✓ Added' : 'Add to Order' }}
      </button>
    </div>

  </div>
</template>