export interface TableFull {
  id: number
  tableNumber: number
  openCosts: number
  numberOfPeople: number
  occupied: boolean
  occupiedFrom: any
  occupiedTill: any
  positionX: number
  positionY: number
}

export interface Table {
  tableNummer: number
  openCosts: number
  numberOfPeople: number
  occupied: boolean
  occupiedFrom: any
  occupiedTill: any
  positionX: number
  positionY: number
}

export interface TableAddRequest {
  tableNummer: number
  numberOfPeople: number
  positionX: number
  positionY: number
}
