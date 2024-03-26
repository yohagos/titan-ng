import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { LoginCredentials, RegisterCredentials, User, UserAddRequest, UserBasic, UserUpdatePin } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { AuthModel } from '../models/auth.model';

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

  // Storage

  savePin(pin: number) {
    window.localStorage['pin'] = pin
  }

  removePin() {
    window.localStorage.removeItem('pin')
  }

  saveCurrentUser(user: User) {
    let users = this.currentUserSubject.getValue()
    users = user
    this.currentUserSubject.next(users)
  }

  getCurrentUser() {
    return this.currentUserSubject.getValue()
  }

  // Backend Calls

  register(credentials: RegisterCredentials) {
    return this.http.post('auth/register', credentials)
  }

  login(credentials: LoginCredentials) {
    return this.http.post<AuthModel>("auth/authenticate", credentials, {withCredentials: true})
  }

  loadUsers() {
    return this.http.get<UserBasic[]>('user')
  }

  pinAuthentication(pin: string) {
    return this.http.get(`user/${pin}`)
  }

  pinUpdate(request: UserUpdatePin) {
    return this.http.put('user/pin', request)
  }

  addNewUser(user: UserAddRequest) {
    return this.http.post<User>("user/add", user, {withCredentials: true})
  }

  editUser(user: UserBasic) {
    return this.http.put<UserBasic>(`user/edit`, user, {withCredentials: true})
  }

  deleteUser(id: number) {
    return this.http.delete<UserBasic>(`user/${id}`)
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
