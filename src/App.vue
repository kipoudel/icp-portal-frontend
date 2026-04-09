<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  if (localStorage.getItem('token')) {
    try {
      await authStore.fetchUser()
    } catch {
      localStorage.removeItem('token')
    }
  }
})
</script>

<template>
  <RouterView />
</template>