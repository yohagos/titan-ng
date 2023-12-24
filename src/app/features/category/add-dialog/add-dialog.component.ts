import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryUnit } from 'src/app/core/models/category.enum';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  addCategoryForm: FormGroup
  hide = false
  selectedColor = ''

  unitEnum = CategoryUnit

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    public _snackbar: MatSnackBar
  ) {
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl('', Validators.required),
      measurement: new FormControl(0, Validators.required),
      unit: new FormControl('', Validators.required)
    })
  }

  add() {
    if (this.addCategoryForm.valid && this.selectedColor.length > 1) {
      const category: Category = {
        categoryName: this.addCategoryForm.get('categoryName')?.value,
        measurement: this.addCategoryForm.get('measurement')?.value,
        unit: this.addCategoryForm.get('unit')?.value,
        color: this.selectedColor
      }
      this.categoryService.addCategory(category).subscribe({
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
