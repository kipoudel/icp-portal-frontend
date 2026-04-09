<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import AppLayout from '@/components/AppLayout.vue'
import Toast from '@/components/Toast.vue'
import { ordersApi } from '@/api/orders'
import { ref } from 'vue'
import type { Order } from '@/types'

const queryClient = useQueryClient()
const toast = ref({ show: false, message: '', type: 'success' as 'success' | 'error' })

function showToast(message: string, type: 'success' | 'error') {
  toast.value = { show: true, message, type }
  setTimeout(() => toast.value.show = false, 3000)
}

const { data, isLoading, isError } = useQuery({
  queryKey: ['orders'],
  queryFn: () => ordersApi.list().then(r => r.data),
})

const { mutate: cancelOrder, isPending } = useMutation({
  mutationFn: (id: number) => ordersApi.cancel(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    showToast('Order cancelled successfully.', 'success')
  },
  onError: () => {
    showToast('Failed to cancel order.', 'error')
  }
})

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}
</script>

<template>
  <AppLayout>
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-white">My Orders</h1>
      <p class="text-gray-400 text-sm mt-1">Track and manage your orders</p>
    </div>

    <div v-if="isLoading" class="space-y-4">
      <div v-for="n in 4" :key="n" class="bg-gray-900 border border-gray-800 rounded-xl h-28 animate-pulse" />
    </div>

    <div v-else-if="isError" class="text-center py-20">
      <p class="text-red-400">Failed to load orders.</p>
    </div>

    <div v-else-if="!data?.data?.length" class="text-center py-20">
      <p class="text-5xl mb-4">📋</p>
      <p class="text-gray-400">No orders yet.</p>
      <router-link to="/" class="mt-3 inline-block text-blue-400 text-sm hover:underline">
        Browse products
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in data.data"
        :key="order.id"
        class="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
      >
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <span class="text-white font-medium text-sm">Order #{{ order.id }}</span>
              <span
                class="text-xs border px-2 py-0.5 rounded-full capitalize"
                :class="statusStyles[order.status]"
              >
                {{ order.status }}
              </span>
            </div>
            <p class="text-gray-500 text-xs">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="text-right">
            <p class="text-white font-semibold">${{ Number(order.total_amount).toFixed(2) }}</p>
            <button
              v-if="order.status === 'pending'"
              @click="cancelOrder(order.id)"
              :disabled="isPending"
              class="mt-1 text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
            >
              Cancel order
            </button>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-3">
          <p class="text-gray-500 text-xs mb-2">Items</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="product in order.products"
              :key="product.id"
              class="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md"
            >
              {{ product.name }} × {{ product.quantity }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <Toast :show="toast.show" :message="toast.message" :type="toast.type" />
  </AppLayout>
</template>