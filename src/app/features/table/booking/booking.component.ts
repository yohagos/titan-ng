import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFull } from 'src/app/core/models/product.model';
import { TableFull } from 'src/app/core/models/table.model';
import { ProductService } from 'src/app/core/services/product.service';
import { TableService } from 'src/app/core/services/table.service';
import { TransferService } from 'src/app/core/services/transfer.service';

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
export class BookingComponent implements OnInit, AfterViewInit {
  table!: TableFull
  dataSource = new MatTableDataSource()

  allProducts: ProductFull[] = []

  filterText = ''

  displayedColumns: string [] = ['item', 'price', 'quantity', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transferService: TransferService,
    private productService: ProductService,
    private tableService: TableService,
    private _snackbar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(
      (params) => {
        this.table = params as TableFull
      }
    )
    this.transferService.products$.subscribe(
      data => {
        this.loadingTable(data)
      }
    )
  }

  ngOnInit() {
    this.tableService.getProductsForTable(this.table.id).subscribe(
      data => this.loadingTable(data)
    )
  }

  ngAfterViewInit() {
    this.productService.loadProducts().subscribe(
      data => {
        this.allProducts = data
      }
    )
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

  addQuantity(element: ProductList) {
    let prod = this.allProducts.find((product) => product.name === element.item)
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
    let products = this.transferService.getAllProducts()

    this.tableService.storeProductToTable(this.table.id, products).subscribe({
      next: () => {
        this._snackbar.open('Parked order', 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.transferService.clear()
        this.router.navigate(['/nav/table'])
      },
      error: (err) => {
        this._snackbar.open(err, 'Close', {
          duration: 4000,
          panelClass: ['snackbarError'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

}
