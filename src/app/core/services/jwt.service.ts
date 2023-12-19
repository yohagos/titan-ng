import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken() {
    return window.localStorage['jwtToken']
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  getEmail() {
    return window.localStorage['email']
  }

  saveEmail(email: string) {
    window.localStorage['email'] = email
  }

  destroyToken() {
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('jwtToken')
  }
}
