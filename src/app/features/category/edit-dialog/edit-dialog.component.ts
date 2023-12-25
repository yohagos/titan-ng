import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryUnit } from 'src/app/core/models/category.enum';
import { Category, CategoryFull } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  editCategoryForm: FormGroup
  unitEnum = CategoryUnit
  selectedColor: string
  colorChanges = false

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {category: CategoryFull},
    private categoryService: CategoryService,
    public formBuilder: FormBuilder,
    public _snackbar: MatSnackBar
  ) {
    this.editCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', Validators.required),
      measurement: new FormControl(0, Validators.required),
      unit: new FormControl('', Validators.required)
    })
    this.fillForm()
    this.selectedColor = this.data.category.color
  }

  fillForm() {
    this.editCategoryForm.get('categoryName')?.setValue(this.data.category.categoryName)
    this.editCategoryForm.get('measurement')?.setValue(this.data.category.measurement)
    this.editCategoryForm.get('unit')?.setValue(this.data.category.unit)
  }

  save() {
    const body: Category = {
      categoryName: this.editCategoryForm.get('categoryName')?.value,
        measurement: this.editCategoryForm.get('measurement')?.value,
        unit: this.editCategoryForm.get('unit')?.value,
        color: this.selectedColor
    }

    this.categoryService.editCategory(this.data.category.id, body).subscribe({
      next: () => {
        this._snackbar.open("Category edited successfully", "close")
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
