import { CategoryFull } from "./category.model"

export interface ProductFull {
  id: number
  name: string
  price: number
  category: CategoryFull
}

export interface Product {
  name: string
  price: number
  category: CategoryFull
}

export interface ProductAddRequest {
  name: string
  price: number
  productCategoryId: number
}

export interface ProductEditRequest {
  id?: number
  name?: string
  price: number
  categoryId: number
}
