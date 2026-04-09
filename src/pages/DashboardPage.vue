<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import AppLayout from '@/components/AppLayout.vue'
import ProductCard from '@/components/ProductCard.vue'
import { productsApi } from '@/api/products'
import { categoriesApi } from '@/api/categories'

const search = ref('')
const selectedCategory = ref<number | null>(null)
const page = ref(1)

const { data: categoriesData } = useQuery({
  queryKey: ['categories'],
  queryFn: () => categoriesApi.list().then(r => r.data),
})

const { data, isLoading, isError } = useQuery({
  queryKey: computed(() => ['products', search.value, selectedCategory.value, page.value]),
  queryFn: () => productsApi.list({
    search: search.value || undefined,
    category_id: selectedCategory.value || undefined,
    page: page.value,
  }).then(r => r.data),
  placeholderData: (prev) => prev,
})

function clearFilters() {
  search.value = ''
  selectedCategory.value = null
  page.value = 1
}
</script>

<template>
  <AppLayout>
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-white">Product Dashboard</h1>
      <p class="text-gray-400 text-sm mt-1">Browse and add products to your order</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or SKU..."
        class="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        @input="page = 1"
      />
      <select
        v-model="selectedCategory"
        class="px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        @change="page = 1"
      >
        <option :value="null">All Categories</option>
        <option
          v-for="cat in categoriesData?.data"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>
      <button
        v-if="search || selectedCategory"
        @click="clearFilters"
        class="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
      >
        Clear
      </button>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="n in 8" :key="n"
        class="bg-gray-900 border border-gray-800 rounded-xl p-5 h-64 animate-pulse"
      />
    </div>

    <div v-else-if="isError" class="text-center py-20">
      <p class="text-red-400">Failed to load products. Make sure the API is running.</p>
    </div>

    <div v-else-if="data?.data?.length === 0" class="text-center py-20">
      <p class="text-gray-400">No products found.</p>
      <button @click="clearFilters" class="mt-3 text-blue-400 text-sm hover:underline">Clear filters</button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in data?.data"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="data?.meta && data.meta.last_page > 1" class="flex items-center justify-center gap-3 mt-8">
      <button
        @click="page--"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
      >
        ← Previous
      </button>
      <span class="text-gray-400 text-sm">Page {{ page }} of {{ data.meta.last_page }}</span>
      <button
        @click="page++"
        :disabled="page === data.meta.last_page"
        class="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
      >
        Next →
      </button>
    </div>

  </AppLayout>
</template>