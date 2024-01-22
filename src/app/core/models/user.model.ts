export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  pin: number
  createdAt?: any
  accessToken: string
  refreshToken: string
  role?: string
}

export interface UserBasic {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  pin: number
  role?: string
}

export interface RegisterCredentials {
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserUpdatePin {
  userId: number | undefined
  pin: number
}

export interface UserAddRequest {
  firstname: string
  lastname: string
  email: string
  pin: number
  role?: string
}

export enum UserRoles {
  User,
  Manager,
  Admin
}
