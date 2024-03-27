export interface Settings {
  id?: number

  companyName?: string
  streetName?: string
  streetNumber?: string
  postalCode?: string
  cityName?: string

  timerLockScreen?: number

  cashContent?: number
  cardReader?: string

  taxesToGo?: number
  taxesIn?: number

  [key: string]: any
}
