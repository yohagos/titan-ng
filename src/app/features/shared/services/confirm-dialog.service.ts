import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  confirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    })

    return dialogRef.afterClosed()
  }
}
