import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.jwtService.getToken()) {
      return true
    }
    this.router.navigate(['/'])
    return false
  }
}
