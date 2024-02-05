export interface StorageFull {
  id: number
  name: string
  pricePerBottle: number
  stockOfBottles: number
  currentStock: number
  criticalStockOfBottles: number
}

export interface Storage {
  name: string
  pricePerBottle: number
  stockOfBottles: number
  currentStock: number
  unit: string
  measurement: number
  criticalStockOfBottles: number
}


