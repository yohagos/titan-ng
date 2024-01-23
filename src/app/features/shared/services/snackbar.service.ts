import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  snackbarSuccess(message: string, action: string, duration?: number) {
    this.snackbar.open(message, action, {
      duration: duration || 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  snackbarError(message: string, error: string) {
    this.snackbar.open(message + ' ' + error, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
