import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { CategoryService } from 'src/app/core/services/category.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Category, CategoryFull } from 'src/app/core/models/category.model';
import { ConfirmDialogService } from '../shared/services/confirm-dialog.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryForm!: FormGroup
  dataSource: any
  loading = true
  filterText = ''

  displayedColumns: string[] = ['name', 'measurement', 'unit', 'color', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private categoryService: CategoryService,
    private confirmService: ConfirmDialogService,
    private matDialog: MatDialog
  ) {
    this.loadingData()
  }

  loadingData() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.loading = false
      }
    )
  }

  addCategoryDialog() {
    const dialogRef = this.matDialog.open(AddDialogComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(
      () => {
        this.loadingData()
      }
    )
  }

  editCategory(data: CategoryFull) {
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      width: '300px',
      data: {category: data}
    })
    dialogRef.afterClosed().subscribe(
      () => {
        this.loadingData()
      }
    )
  }


  deleteCategory(item: CategoryFull) {
    this.confirmService.confirm().subscribe((result) => {
      if (result) {
        const body: Category = {
          categoryName: item.categoryName,
          measurement: item.measurement,
          unit: item.unit,
          color: item.color
        }
        console.log(body)
        this.categoryService.deleteCategory(item.id).subscribe(
          () => {
            this.loadingData()
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
    this.dataSource.filter = ''
    this.filterText = ''
  }

}
