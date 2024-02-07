import { Unit } from "./category.enum"
import { StorageFull } from "./storage.model"

export interface ProductStockFull {
  id: number
  unit: Unit
  measurement: number
  good: StorageFull
}

export interface ProductStock {
  unit: Unit
  measurement: number
  good: StorageFull
}

export interface ProductStockAddRequest {
  unit: string
  measurement: number
  good: string
}
