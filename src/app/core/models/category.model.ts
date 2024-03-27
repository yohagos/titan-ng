import { Icons } from "./icons.model"

export interface CategoryFull {
  id: number
  categoryName: string
  measurement: number
  unit: string
  color: string
  icon: Icons
}

export interface CategoryI {
  categoryName: string
  measurement: number
  unit: string
  color: string
  iconId: number
}

export interface Category {
  categoryName: string
  measurement: number
  unit: string
  color: string
}
