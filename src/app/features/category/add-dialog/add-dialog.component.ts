import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryMeasurement } from 'src/app/core/models/category.enum';
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

  measurementEnum = CategoryMeasurement

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl('', Validators.required),
      measurement: new FormControl(0, Validators.required),
      unit: new FormControl('', Validators.required)
    })
  }

  add() {
    console.log(this.addCategoryForm.value)
    if (this.addCategoryForm.valid && this.selectedColor.length > 1) {
      const category: Category = {
        categoryName: this.addCategoryForm.get('categoryName')?.value,
        measurement: + this.addCategoryForm.get('measurement')?.value,
        unit: this.addCategoryForm.get('unit')?.value,
        color: this.selectedColor
      }
      this.categoryService.addCategory(category).subscribe(
        data => { console.log(data)}
      )
    }
  }
}
