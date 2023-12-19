import { Injectable } from '@angular/core';

import {
  Observable, BehaviorSubject,
  distinctUntilChanged, map
} from "rxjs";
import { LoginCredentials, RegisterCredentials, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)

  public currentUser = this.currentUserSubject
          .asObservable()
          .pipe(distinctUntilChanged())

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jwtService: JwtService
  ) { }

  register(credentials: RegisterCredentials) {
    return this.http.post('auth/register', credentials)
  }

  login(credentials: LoginCredentials) {
    return this.http.post("auth/authenticate", credentials, {withCredentials: true})
  }

  purgeAuth() {
    this.jwtService.destroyToken()

    this.currentUserSubject.next(null)
  }

  logout() {
    this.purgeAuth()
    void this.router.navigate(['/login'])
  }
}
