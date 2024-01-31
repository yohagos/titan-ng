import { ProductFull } from "./product.model"
import { User, UserBasic } from "./user.model"

export interface TransactionFull {
  id: number
  price: number
  withTip: boolean
  tip: number
  withCard: boolean
  cardNumber: string
  paid: boolean
  user: UserBasic
  products: ProductFull[]
}

export interface Transaction {
  price: number
  withTip: boolean
  tip: number
  withCard: boolean
  cardNumber: string
  paid: boolean
  user: UserBasic
  products?: ProductFull[]
}

export interface TransactionCash {
  price: number
  withTip: boolean
  tip: number
  paid: boolean
  userId?: number
}

export interface TransactionCard {
  price: number
  withTip: boolean
  tip: number
  withCard: boolean
  cardNumber: string
  paid: boolean
  userId?: number
}

