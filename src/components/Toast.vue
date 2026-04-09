<script setup lang="ts">
defineProps<{
  message: string
  type?: 'success' | 'error'
  show: boolean
}>()
</script>

<template>
  <Transition name="toast">
    <div
      v-if="show"
      class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2"
      :class="type === 'error'
        ? 'bg-red-600 text-white'
        : 'bg-green-600 text-white'"
    >
      <span>{{ type === 'error' ? '✕' : '✓' }}</span>
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>