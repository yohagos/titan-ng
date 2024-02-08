import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
import { TableFull } from 'src/app/core/models/table.model';
import { ProductService } from 'src/app/core/services/product.service';
import { TableService } from 'src/app/core/services/table.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

interface ProductList {
  item: string
  price: number
  quantity: number
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  table!: TableFull
  dataSource = new MatTableDataSource()

  filterText = ''

  displayedColumns: string [] = ['item', 'price', 'quantity', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  allProducts: ProductFull[] = []
  private productSubscribtion!: Subscription

  previousProducts: ProductFull[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transferService: TransferService,
    private productService: ProductService,
    private tableService: TableService,
    private snackbarService: SnackbarService
  ) {
    this.route.queryParams.subscribe(
      (params) => {
        this.table = params as TableFull
      }
    )
    this.productSubscribtion = this.transferService.products$.subscribe(
      data => {
        data.forEach((prod) => {
          this.previousProducts.push(prod)
        })
        this.loadingTable(this.previousProducts)
      }
    )
    this.productService.loadProducts().subscribe(
      data => {
        this.allProducts = data
      }
    )
  }

  ngOnInit() {
    this.tableService.getProductsForTable(this.table.id).subscribe(
      data => {
        this.loadingTable(data)
      }
    )
  }

  loadingTable(products: ProductFull[]) {
    console.log(products)
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
    this.dataSource.data = [...distinctProducts]
  }

  addQuantity(element: ProductFull) {
    console.log(element)
    let prod = this.allProducts.find((product) => product.id === element.id)
    console.log(prod)
    if (prod != undefined) {
      this.transferService.addProduct(prod)
    }
  }

  reduceQuantity(element: ProductList) {
    this.transferService.removeProduct(element.item)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearFilter() {
    this.filterText = ''
  }

  saveTable() {
    this.router.navigate(['/nav/able'])
    /* let products = this.transferService.getAllProducts() */
    /* let products: ProductFull[] = this.dataSource.data as ProductFull[]
    this.tableService.storeProductToTable(this.table.id, products).subscribe({
      next: () => {
        this.snackbarService.snackbarSuccess("", "")
        this.router.navigate(['/nav/able'])
      },
      error: (err) => {
        this.snackbarService.snackbarError(`Err: ${err}`, "")
      }
    }) */
  }

}
