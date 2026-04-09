import api from './axios'

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),

  register: (name: string, email: string, password: string, password_confirmation: string) =>
    api.post('/register', { name, email, password, password_confirmation }),

  logout: () => api.post('/logout'),

  me: () => api.get('/me'),
}