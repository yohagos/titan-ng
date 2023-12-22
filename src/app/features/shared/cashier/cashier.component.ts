import { Component, OnInit } from '@angular/core';
import { Observable, map, ObservedValueOf, Subscription} from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
import { TransferService } from 'src/app/core/services/transfer.service';

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
    private transferService: TransferService
  ) {
    this.productSubscription = this.transferService.products$.subscribe(products => {
      this.products = products
      this.calculateTotalPrice()
    })
  }

  private calculateTotalPrice() {
    this.price = this.products.reduce((sum, product) => sum + product.price, 0)
  }

  cashButton() {
    console.log('paid by cash')
    this.transferService.clear()
  }

  cardButton() {
    console.log('paid by card')
    this.transferService.clear()
  }

}
