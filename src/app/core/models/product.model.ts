import { CategoryFull } from "./category.model"

export interface ProductFull {
  id: number
  name: string
  price: number
  category: CategoryFull
}
