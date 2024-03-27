import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrl: './card-dialog.component.scss'
})
export class CardDialogComponent implements OnInit {

  constructor(
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {

  }

  transactionCanceled() {
    this.snackbarService.snackbarError("Error Occurred: ", "Manuelly canceled")
  }

}
