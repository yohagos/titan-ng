export interface TableFull {
  id: number
  tableNumber: number
  openCosts: number
  numberOfPeople: number
  occupied: boolean
  occupiedFrom: any
  occupiedTill: any
}

export interface Table {
  tableNummer: number
  openCosts: number
  numberOfPeople: number
  occupied: boolean
  occupiedFrom: any
  occupiedTill: any
}

export interface TableAddRequest {
  tableNummer: number
  numberOfPeople: number
}
