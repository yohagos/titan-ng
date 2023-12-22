import { Component } from '@angular/core';
import { ProductFull } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  navigationOpen = true

  navigationList: ProductFull[] = []

  constructor(
    private readonly productService: ProductService,
    private readonly transferService: TransferService
  ) {
    this.productService.loadProducts().subscribe(
      data => {
        this.navigationList = data as ProductFull[]
      }
    )
  }

  add(item: ProductFull) {
    this.transferService.addProduct(item)
  }

}
