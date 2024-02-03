import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryUnit } from 'src/app/core/models/category.enum';
import { CategoryFull } from 'src/app/core/models/category.model';
import { ProductAddRequest } from 'src/app/core/models/product.model';
import { ProductStock } from 'src/app/core/models/productStock.model';
import { StorageFull } from 'src/app/core/models/storage.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss'
})
export class AddProductDialogComponent {
[x: string]: any;
  addProductForm: FormGroup
  formArray!: FormArray

  categories: CategoryFull[] = []
  inventory: StorageFull[] = []

  categuryUnits = Object.keys(CategoryUnit)

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    public _snackbar: MatSnackBar,
    private storageService: StorageService,
  ) {
    this.addProductForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl()
    })
    this.loadCategoryData()
    this.loadStorageData()
  }

  loadCategoryData() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  loadStorageData() {
    this.storageService.getInventory().subscribe(
      data => this.inventory = data
    )
  }

  createRow(): FormGroup {
    return this.fb.group({
      measurement: new FormControl(0),
      unit: new FormControl(CategoryUnit.CL),
      good: new FormControl(null)
    })
  }

  getUnits() {
    this.categuryUnits.slice(this.categuryUnits.length/2)
  }

  addProduct() {
    if (this.addProductForm.valid) {
      const product: ProductAddRequest = {
        name: this.addProductForm.get('name')?.value,
        price: this.addProductForm.get('price')?.value,
        productCategoryId: +this.addProductForm.get('category')?.value,
      }
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.dialogRef.close()
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

}
