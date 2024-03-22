export interface Settings {
  id?: number

  companyName?: string
  streetName?: string
  streetNumber?: string
  postalCode?: string
  cityName?: string

  timerLockScreen?: number

  [key: string]: any
}
