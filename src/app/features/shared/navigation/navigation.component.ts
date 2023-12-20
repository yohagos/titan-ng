import { Component } from '@angular/core';
import { ProductFull } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  navigationOpen = true

  navigationList: ProductFull[] = []

  constructor(
    private readonly productService: ProductService
  ) {
    this.productService.loadProducts().subscribe(
      data => {
        this.navigationList = data as ProductFull[]
        console.log(this.navigationList)
      }
    )
  }

}
