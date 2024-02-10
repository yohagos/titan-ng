import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { TransferService } from 'src/app/core/services/transfer.service';

interface ProductList {
  item: string
  price: number
  quantity: number
}

@Component({
  selector: 'app-togo',
  templateUrl: './togo.component.html',
  styleUrl: './togo.component.scss'
})
export class TogoComponent {
  private productSubscribiton: Subscription
  selectedProducts: ProductFull[] = []

  filterText = ''
  dataSource = new MatTableDataSource()
  displayedColumns: string [] = ['item', 'price', 'quantity', 'actions']
  @ViewChild(MatSort) sort!: MatSort


  constructor(
    private transferService: TransferService,
    private productService: ProductService
  ) {
    this.productSubscribiton = this.transferService.products$.subscribe((data) => {
      this.loadingTable(data)
    })
    this.productService.loadProducts().subscribe(data => {
      this.selectedProducts = data
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearFilter() {
    this.filterText = ''
  }

  addQuantity(element: ProductList) {
    let prod = this.selectedProducts.find((product) => product.name === element.item)
    console.log('prod: ', prod)
    if (prod != undefined) {
      this.transferService.addProduct(prod)
      this.dataSource.data.push(prod)
    }
  }

  reduceQuantity(element: ProductList) {
    this.transferService.removeProduct(element.item)
  }

  loadingTable(products: ProductFull[]) {
    let distinctProducts: ProductList[] = []

    products.forEach((product) => {
      const isInArray = distinctProducts?.some((el) => el.item === product.name)
      if (isInArray) {
        const index = distinctProducts.findIndex((el) => el.item === product.name)
        distinctProducts[index].quantity += 1
      } else {
        const prod: ProductList = {
          item: product.name,
          price: product.price,
          quantity: 1
        }
        distinctProducts.push(prod)
      }
    })
    this.dataSource.data = distinctProducts
  }

}
