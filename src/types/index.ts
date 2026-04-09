export interface User {
  id: number
  name: string
  email: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Product {
  id: number
  name: string
  sku: string
  price: number
  stock_quantity: number
  image: string | null
  category: Category
}

export interface OrderItem {
  product_id: number
  quantity: number
}

export interface OrderProduct {
  id: number
  name: string
  sku: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: number
  status: 'pending' | 'completed' | 'cancelled'
  total_amount: number
  products: OrderProduct[]
  created_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface CartItem {
  product: Product
  quantity: number
}