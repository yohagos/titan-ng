import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken()
    const expired = this.jwtService.isTokenExpired()
    const request = req.clone({
      setHeaders: {
        ...(expired ? '' : {Authorization: `Bearer ${token}`})
      }
    })
    return next.handle(request).pipe(
      catchError((error, caught) => {
        if (error.status === 401) {
          this.snackbarService.snackbarError(error.message, 'Error')
          this.jwtService.destroyToken()
          this.router.navigate(['/login'])
        }
        return throwError(caught)
      })
    )
  }
}
