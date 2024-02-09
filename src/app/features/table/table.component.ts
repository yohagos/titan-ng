import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, Scroll } from '@angular/router';
import { TableFull } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';

import { MatDialog } from '@angular/material/dialog';
import { PinDialogComponent } from '../authentication/pin-dialog/pin-dialog.component';
import { TransferService } from 'src/app/core/services/transfer.service';
import { Subscription } from 'rxjs';
import { ProductFull } from 'src/app/core/models/product.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface ProductList {
  item: string
  price: number
  quantity: number
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  loading = true
  tables: TableFull[] = []
  tables$ = this.tableService.tables

  private timer: any
  private timeout: number = 30000
  private isDialogOpen = false;

  private productSubscription: Subscription
  selectedProducts: ProductFull[] = []
  productsAreSelected = false

  filterText = ''
  dataSource = new MatTableDataSource()
  displayedColumns: string [] = ['item', 'price', 'quantity', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private readonly tableService: TableService,
    private router: Router,
    private matDialog: MatDialog,
    private transferService: TransferService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        if (event?.routerEvent.url === '/nav/table') {
          this.loadTables()
        }
      }
    })
    this.dialog()
    //this.startTimer()
    this.productSubscription = this.transferService.products$.subscribe((data) => {
      this.selectedProducts = data
      if (data.length > 0) {
        this.productsAreSelected = true
        this.loadingTable(data)
      } else {
        this.productsAreSelected = false
      }
    })
  }

  ngOnInit() {
    document.addEventListener('click', this.resetTimer.bind(this))
    document.addEventListener('keydown', this.resetTimer.bind(this))
    document.addEventListener('mousemove', this.resetTimer.bind(this))
  }

  loadTables() {
    this.tableService.loadTables().subscribe(
      data => {
        this.tables = data
        this.loading = false
      }
    )
  }

  changeColorDependingOnOccupied(table: TableFull) {
    let color = {}
    if (table.occupied) {
      color = {'background-color': '#f57b5d'}
    }
    return color
  }

  occupy(tableID: number) {
    let table = this.tables.find(table => table.id === tableID)
    if (table) {
      table.occupied = !table.occupied
    }
  }

  openTable(table: TableFull) {
    this.router.navigate(['/nav/table', table.id], {queryParams: {...table}, skipLocationChange: true})
  }

  tablePositon(table: TableFull) {
    return {x: table.positionX, y: table.positionY}
  }

  dialog() {
    this.isDialogOpen = true
    const dialogRef = this.matDialog.open(PinDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(() => {
      clearTimeout(this.timer)
      this.startTimer()
      this.isDialogOpen = false
    })
  }

  startTimer() {
    if (!this.isDialogOpen) {
      this.timer = setTimeout(() => {
        this.isDialogOpen = true
        this.dialog()
      }, this.timeout)
      this.isDialogOpen = false
    }
  }

  resetTimer() {
    clearTimeout(this.timer)
    this.startTimer()
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
