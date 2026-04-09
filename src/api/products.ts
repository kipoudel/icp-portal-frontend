import api from './axios'

export const productsApi = {
  list: (params?: { search?: string; category_id?: number; page?: number }) =>
    api.get('/products', { params }),

  show: (id: number) => api.get(`/products/${id}`),

  create: (data: object) => api.post('/products', data),

  update: (id: number, data: object) => api.put(`/products/${id}`, data),

  delete: (id: number) => api.delete(`/products/${id}`),
}