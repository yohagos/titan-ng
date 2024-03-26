import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription} from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
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
    private matDialog: MatDialog,
  ) {
    this.productSubscription = this.transferService.products$.subscribe(products => {
      this.products = products
      this.calculateTotalPrice()
    })
  }

  private calculateTotalPrice() {
    this.price = this.products.reduce((sum, product) => sum + product.price, 0)
  }

  get isDisabled() {
    return this.price <= 0
  }

  cashTransactionsDialog() {
    this.matDialog.open(CashDialogComponent, {
      width: '400px',
      height: '400px'
    })
  }

  cardTransaction() {
    this.matDialog.open(CardDialogComponent, {
      width: '400px',
      height: '400px'
    })
  }
}
