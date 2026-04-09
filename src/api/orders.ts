import api from './axios'
import type { OrderItem } from '@/types'

export const ordersApi = {
  list: () => api.get('/orders'),

  show: (id: number) => api.get(`/orders/${id}`),

  create: (items: OrderItem[]) => api.post('/orders', { items }),

  cancel: (id: number) => api.patch(`/orders/${id}/cancel`),
}