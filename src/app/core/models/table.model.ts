import { ProductFull } from "./product.model"

export interface TableFull {
  id: number
  tableNumber: number
  openCosts?: number
  numberOfPeople: number
  occupied?: boolean
  occupiedFrom?: any
  occupiedTill?: any
  tile: Tile
  products?: ProductFull[]
}

export interface Table {
  tableNummer: number
  openCosts: number
  numberOfPeople: number
  occupied: boolean
  occupiedFrom: any
  occupiedTill: any
  tile: Tile
}

export interface TableAdd {
  tableNumber: number
  numberOfPeople: number
}

export interface TableAddRequest {
  tableNummer: number
  numberOfPeople: number
  tile: Tile
}

export interface Tile {
  id: number
  cols: number
  rows: number
  color: string
}
