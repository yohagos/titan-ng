import { CategoryFull } from "./category.model"
import { ProductStockFull } from "./productStock.model"

export interface ProductFull {
  id: number
  name: string
  price: number
  category: CategoryFull
  components?: ProductStockFull[]
}

export interface Product {
  name: string
  price: number
  category: CategoryFull
  components?: ProductStockFull[]
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

export interface StoreProductsToTable {
  id: number
  products: number[]
}

export interface ProductResponse {
  id: number
  name: string
}
