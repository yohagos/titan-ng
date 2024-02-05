import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Unit } from 'src/app/core/models/category.enum';
import { Storage } from 'src/app/core/models/storage.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-inventory-dialog',
  templateUrl: './add-inventory-dialog.component.html',
  styleUrl: './add-inventory-dialog.component.scss'
})
export class AddInventoryDialogComponent implements OnInit {
  addInventoryForm: FormGroup

  units: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<AddInventoryDialogComponent>,
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

  ngOnInit() {
    this.units = Object.keys(Unit).filter((item) => {
      return isNaN(Number(item))
    })
  }


  addInventory() {
    if (this.addInventoryForm.valid) {
      let request: Storage = {
        name: this.addInventoryForm.get('name')?.value,
        pricePerBottle: this.addInventoryForm.get('pricePerBottle')?.value,
        stockOfBottles: this.addInventoryForm.get('stockOfBottles')?.value,
        currentStock: this.addInventoryForm.get('currentStock')?.value,
        criticalStockOfBottles: this.addInventoryForm.get('criticalStockOfBottles')?.value,
        unit: this.addInventoryForm.get('unit')?.value,
        measurement: this.addInventoryForm.get('measurement')?.value
      }
      this.storageService.addInventory(request).subscribe({
        next: (data) => {
          this.snackbarService.snackbarSuccess(`Added ${data.name}`, "Done")
          this.matDialogRef.close()
        },
        error: (err) => {
          this.snackbarService.snackbarError(`Error: ${err}`, 'Try Again!!')
        }
      })

    } else {
      this.snackbarService.snackbarError("Error: someting went wrong", "Try Again!")
    }
  }

}
