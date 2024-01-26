import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { UtilService } from '../../services/util.service';
import { formatNumber } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { TransactionCash } from 'src/app/core/models/transaction.model';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-cash-dialog',
  templateUrl: './cash-dialog.component.html',
  styleUrl: './cash-dialog.component.scss'
})
export class CashDialogComponent implements OnInit {
  price: number
  cashForm: FormGroup

  actualPrice = 0

  newPrice: number = 0
  tip: number = 0

  withTip = false
  currentUser!: User | null

  constructor(
    private transactionsService: TransactionService,
    private transferService: TransferService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CashDialogComponent>,
    private utilService: UtilService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.price = this.transferService.getAllProducts()
            .reduce((total, product) => total + product.price, 0)
    this.actualPrice = this.price
    this.cashForm = this.formBuilder.group({
      fullPrice: new FormControl({value: this.price.toFixed(2), disabled: true}),
      tip: new FormControl(),
      totalPrice: new FormControl({value: 0, disabled:true})
    })
  }

  ngOnInit(): void {
      this.currentUser = this.userService.getCurrentUser()
  }

  toNextFullNumber() {
    this.newPrice = +this.utilService.increaseToNextFullNumber(this.price)
    this.tip = this.newPrice - this.price
    this.cashForm.get('tip')?.setValue(this.tip.toFixed(2))

    this.price = this.price + this.tip

    this.cashForm.get('totalPrice')?.setValue(this.price.toFixed(2))
    this.checkTotalValue()
  }

  checkTotalValue() {
    this.withTip = this.cashForm.get('totalPrice')?.value > 0
  }

  applyTransaction() {
    let withTip = this.tip > 0
    let tip = this.price - this.actualPrice

    let request: TransactionCash = {
      price: +this.actualPrice.toFixed(2),
      withTip: withTip,
      tip: +tip.toFixed(2),
      paid: true,
      userId: this.currentUser?.id
    }

    this.transactionsService.cashTransaction(request).subscribe({
      next: () => {
        this.snackbarService.snackbarSuccess("Cashed In", "Done")
        this.dialogRef.beforeClosed().subscribe(
          () => {
            this.transferService.clear()
          }
        )
        this.dialogRef.close()
      },
      error: (err) => {
        this.snackbarService.snackbarError(`Error occurred: ${err}`, 'Try Again!')
      }
    })
  }

}
