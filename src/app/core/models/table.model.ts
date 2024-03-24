import { ProductFull } from "./product.model"

export interface TableFull {
  id: number
  tableNumber: number
  openCosts?: number
  numberOfPeople: number
  occupied?: boolean
  occupiedFrom?: any
  occupiedTill?: any
  positionX: number
  positionY: number
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
  positionX: number
  positionY: number
}

export interface TableAddRequest {
  tableNummer: number
  numberOfPeople: number
}

export interface Tile {
  id: number
  cols: number
  rows: number
  color: string
}
