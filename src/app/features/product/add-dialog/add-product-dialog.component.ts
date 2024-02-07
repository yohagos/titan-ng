import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unit } from 'src/app/core/models/category.enum';
import { CategoryFull } from 'src/app/core/models/category.model';
import { ProductAddRequest } from 'src/app/core/models/product.model';
import { ProductStockAddRequest } from 'src/app/core/models/productStock.model';
import { StorageFull } from 'src/app/core/models/storage.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss'
})
export class AddProductDialogComponent {
  addProductForm: FormGroup

  categories: CategoryFull[] = []
  inventory: StorageFull[] = []

  categuryUnits = Object.keys(Unit)

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    private snackbarService: SnackbarService,
    private storageService: StorageService,
  ) {
    this.addProductForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl(),
      items: this.fb.array([
        this.fb.group({
          measurement: new FormControl('', Validators.required),
          unit: new FormControl('', Validators.required),
          good: new FormControl('', Validators.required)
        })
      ])
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

  get items() {
    return this.addProductForm.get('items') as FormArray
  }

  add() {
    this.items.push(this.fb.group({
      measurement: new FormControl(),
      unit: new FormControl(),
      good: new FormControl()
    })
    )
  }

  remove(index: number) {
    this.items.removeAt(index)
  }

  getUnits() {
    return Object.keys(Unit).filter((item) => {
      return isNaN(Number(item))
    })
  }

  prepareItems() {
    let products: ProductStockAddRequest[] = []
    let items = this.addProductForm.get('items')?.value
    for( let item of items) {
      let pro: ProductStockAddRequest = {
        unit: item.unit,
        measurement: +item.measurement,
        good: item.good
      }
      products.push(pro)
    }
    return products
  }

  addProduct() {
    if (this.addProductForm.valid) {
      const product: ProductAddRequest = {
        name: this.addProductForm.get('name')?.value,
        price: this.addProductForm.get('price')?.value,
        productCategoryId: +this.addProductForm.get('category')?.value,
      }

      let items: ProductStockAddRequest[] = this.prepareItems()
      this.productService.addProduct(product).subscribe({
        next: (data) => {
          this.productService.addComponentsToProduct(data.id, items).subscribe({
            next: () => {
              this.dialogRef.close()
            },
            error: (err) => {
              this.snackbarService.snackbarError("Err", "Try Again")
            }
          })
        },
        error: (err) => {
          this.snackbarService.snackbarError("Err", "Try Again")
        }
      })
    }
  }

}
