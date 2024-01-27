import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryFull } from 'src/app/core/models/category.model';
import { ProductEditRequest, ProductFull } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.scss'
})
export class EditProductDialogComponent {
  editProductForm: FormGroup

  categories: CategoryFull[] = []

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {product: ProductFull},
    private productService: ProductService,
    private categoryService: CategoryService,
    public formBuilder: FormBuilder,
    public _snackbar: MatSnackBar
  ) {
    this.editProductForm = this.formBuilder.group({
      id: [0],
      name: [''],
      price: [0],
      category: [null]
    })
    this.loadCategories()
    this.fillForm(data.product)
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      }
    )
  }

  fillForm(product: ProductFull) {
    const defaultProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: {
        id: product.category.id,
        categoryName: product.category.categoryName,
        measurement: product.category.measurement,
        unit: product.category.unit,
        color: product.category.color
      }
    }
    this.editProductForm.patchValue(defaultProduct)
  }

  editProduct() {
    const editProduct: ProductEditRequest = {
      id: this.editProductForm.get('id')?.value,
      name: this.editProductForm.get('name')?.value,
      price: this.editProductForm.get('price')?.value,
      categoryId: this.editProductForm.get('category')?.value
    }

    console.log(editProduct)
    this.productService.editProduct(editProduct).subscribe({
      next: () => {
        this._snackbar.open("Product edited successfully", "close")
        this.dialogRef.close();
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
