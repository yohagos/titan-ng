import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-inventory-dialog',
  templateUrl: './add-inventory-dialog.component.html',
  styleUrl: './add-inventory-dialog.component.scss'
})
export class AddInventoryDialogComponent {
  addInventoryForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addInventoryForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      pricePerBottle: new FormControl('', Validators.required),
      stockOfBottles: new FormControl('', Validators.required),
      unit: new FormControl(null, Validators.required),
      measurement: new FormControl(null, Validators.required),
      currentStock: new FormControl('', Validators.required),
      criticalStockOfBottles: new FormControl('', Validators.required)
    })
  }

}
