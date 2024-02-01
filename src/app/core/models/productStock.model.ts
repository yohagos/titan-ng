import { CategoryUnit } from "./category.enum"
import { StorageFull } from "./storage.model"

export interface ProductStockFull {
  id: number
  unit: CategoryUnit
  measurement: number
  good: StorageFull
}

export interface ProductStock {
  unit: CategoryUnit
  measurement: number
  good: StorageFull
}
