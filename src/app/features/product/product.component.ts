import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFull } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ConfirmDialogService } from '../shared/services/confirm-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from './add-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './edit-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  dataSource: any
  displayedColumns = ['name', 'price', 'category', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  loading = true
  filterText = ''

  constructor(
    private readonly productService: ProductService,
    private confirmService: ConfirmDialogService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.productService.loadProducts().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.loading = false
      }
    )
  }

  addProduct() {
    const dialogRef = this.matDialog.open(AddProductDialogComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(
      () => {
        this.loadData()
      }
    )
  }

  editProduct(product: ProductFull) {
    const dialogRef = this.matDialog.open(EditProductDialogComponent, {
      width: '300',
      data: {product: product}
    })
    dialogRef.afterClosed().subscribe(
      () => {
        this.loadData()
      }
    )
  }

  removeProduct(product: ProductFull) {
    this.confirmService.confirm().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            this.loadData()
          }
        )
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearFilter() {
    this.filterText = ''
  }

}
