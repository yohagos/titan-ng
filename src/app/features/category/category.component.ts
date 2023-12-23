import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { CategoryService } from 'src/app/core/services/category.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

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

  displayedColumns: string[] = ['name', 'measurement', 'unit', 'color']
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private categoryService: CategoryService,
    private matDialog: MatDialog
  ) {
    this.categoryService.getCategories().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.loading = false
      }
    )
  }

  addCategoryDialog() {
    const dialogRef = this.matDialog.open(AddDialogComponent)
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
