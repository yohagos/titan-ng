import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { UtilService } from '../../services/util.service';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-cash-dialog',
  templateUrl: './cash-dialog.component.html',
  styleUrl: './cash-dialog.component.scss'
})
export class CashDialogComponent {
  price: number
  cashForm: FormGroup

  newPrice: number = 0
  tip: number = 0

  withTip = false

  constructor(
    private transactionsService: TransactionService,
    private transferService: TransferService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CashDialogComponent>,
    private utilService: UtilService
  ) {
    this.price = this.transferService.getAllProducts()
            .reduce((total, product) => total + product.price, 0)

    this.cashForm = this.formBuilder.group({
      fullPrice: new FormControl({value: this.price.toFixed(2), disabled: true}),
      tip: new FormControl(),
      totalPrice: new FormControl({value: 0, disabled:true})
    })
  }

  logCashIn() {
    let fullPrice: number = this.cashForm.get('fullPrice')?.value
    let tip: number = +this.cashForm.get('tip')?.value

    fullPrice = fullPrice + tip
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
    
  }

}
