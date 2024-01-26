import { UserBasic } from "./user.model"

export interface TransactionFull {
  id: number
  price: number
  withTip: boolean
  tip: number
  withCard: boolean
  cardNumber: string
  paid: boolean
  user: UserBasic
}

export interface Transaction {
  price: number
  withTip: boolean
  tip: number
  withCard: boolean
  cardNumber: string
  paid: boolean
  user: UserBasic
}

