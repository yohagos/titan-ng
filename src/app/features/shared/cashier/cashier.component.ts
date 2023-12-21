import { Component, OnInit } from '@angular/core';
import { Observable, map, ObservedValueOf} from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.scss'
})
export class CashierComponent {
  total$!: Observable<number>
  products$!: Observable<ProductFull[]>
  price!: number


  constructor(
    private transferService: TransferService
  ) {
    this.products$ = this.transferService.products$
  }

  getTotalPrice() {

    /* this.total$ = this.products$.pipe(
      map(
        products => products.reduce((sum, product) => sum + product.price, 0)
      )
    ) */
  }

}
