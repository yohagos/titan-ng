import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtHelper: JwtHelperService = new JwtHelperService()
  key = ''

  constructor() {
    this.key = environment.CRYPT_KEY
  }

  private encrypt(txt: string) {
    return CryptoJS.AES.encrypt(txt, this.key).toString()
  }

  private decrypt(txtToDcrypt: string) {
    return CryptoJS.AES.decrypt(txtToDcrypt, this.key).toString(CryptoJS.enc.Utf8)
  }

  getToken() {
    return localStorage.getItem('jwtToken')
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token)
  }

  getEmail() {
    return localStorage.getItem('email')
  }

  saveEmail(email: string) {
    localStorage.setItem('email', email)
  }

  destroyToken() {
    localStorage.removeItem('email')
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('pin')
  }

  isTokenExpired() {
    const token = this.getToken()
    if (!token) {
      return true
    }
    const expiredDate = this.getTokenExpirationDate(token)
    const currentDateTime = new Date()
    if (expiredDate !== null) {
      return expiredDate < currentDateTime
    }
    return false
  }

  getTokenExpirationDate(token: string) {
    return this.jwtHelper.getTokenExpirationDate(token)
  }
}
