import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryUnit } from 'src/app/core/models/category.enum';
import { CategoryFull, CategoryI } from 'src/app/core/models/category.model';
import { Icons } from 'src/app/core/models/icons.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';

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
    @Inject(MAT_DIALOG_DATA) public data: {category: CategoryFull, icons: Icons[]},
    private categoryService: CategoryService,
    public formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.editCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', Validators.required),
      measurement: new FormControl(0, Validators.required),
      unit: new FormControl('', Validators.required),
      iconId: new FormControl()
    })
    this.fillForm()
    this.selectedColor = this.data.category.color
  }

  fillForm() {
    this.editCategoryForm.get('categoryName')?.setValue(this.data.category.categoryName)
    this.editCategoryForm.get('measurement')?.setValue(this.data.category.measurement)
    this.editCategoryForm.get('unit')?.setValue(this.data.category.unit)
    this.editCategoryForm.get('iconId')?.setValue(this.data.category.icon.name)
  }

  save() {
    const body: CategoryI = {
      categoryName: this.editCategoryForm.get('categoryName')?.value,
      measurement: this.editCategoryForm.get('measurement')?.value,
      unit: this.editCategoryForm.get('unit')?.value,
      color: this.selectedColor,
      iconId: this.editCategoryForm.get('iconId')?.value
    }

    this.categoryService.editCategory(this.data.category.id, body).subscribe({
      next: () => {
        this.snackbarService.snackbarSuccess("Category edited successfully", "close")
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackbarService.snackbarError(`Error occured: ${err}`, "Try Again!")
      }
    })
  }

}
