import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { CashDialogComponent } from './cash-dialog/cash-dialog.component';
import { CardDialogComponent } from './card-dialog/card-dialog.component';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.scss'
})
export class CashierComponent {
  total$!: Observable<number>
  products!: ProductFull[]
  price!: number

  private productSubscription: Subscription

  constructor(
    private transferService: TransferService,
    private router: Router,
    private matDialog: MatDialog,
    private transactionService: TransactionService
  ) {
    this.productSubscription = this.transferService.products$.subscribe(products => {
      this.products = products
      this.calculateTotalPrice()
    })
  }

  private calculateTotalPrice() {
    this.price = this.products.reduce((sum, product) => sum + product.price, 0)
  }

  cashTransactionsDialog() {
    this.matDialog.open(CashDialogComponent, {
      width: '400px',
      height: '500px'
    })
  }

  cardTransaction() {
    this.matDialog.open(CardDialogComponent, {
      width: '400px',
      height: '500px'
    })
  }

  

}