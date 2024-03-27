import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Unit } from 'src/app/core/models/category.enum';
import { CategoryI } from 'src/app/core/models/category.model';
import { Icons } from 'src/app/core/models/icons.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  addCategoryForm: FormGroup
  hide = false
  selectedColor = ''

  icons: Icons[] = []

  unitEnum = Unit

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) data: {icons: Icons[]}
  ) {
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl('', Validators.required),
      measurement: new FormControl(0, Validators.required),
      unit: new FormControl('', Validators.required),
      icon: new FormControl('')
    })
  }

  add() {
    if (this.addCategoryForm.valid && this.selectedColor.length > 1) {
      const category: CategoryI = {
        categoryName: this.addCategoryForm.get('categoryName')?.value,
        measurement: this.addCategoryForm.get('measurement')?.value,
        unit: this.addCategoryForm.get('unit')?.value,
        color: this.selectedColor,
        iconId: this.addCategoryForm.get('icon')?.value
      }
      this.categoryService.addCategory(category).subscribe({
        next: () => {
          this.dialogRef.close()
        },
        error: (err) => {
          this.snackbarService.snackbarError(`Error occured: ${err}`, "Try Again!")
        }
      })
    }
  }
}
