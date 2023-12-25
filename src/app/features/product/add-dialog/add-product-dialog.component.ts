import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryFull } from 'src/app/core/models/category.model';
import { ProductAddRequest } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss'
})
export class AddProductDialogComponent {
  addProductForm: FormGroup

  categories: CategoryFull[] = []

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    public _snackbar: MatSnackBar
  ) {
    this.addProductForm = this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl()
    })
    this.loadCategoryData()
  }

  loadCategoryData() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
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
