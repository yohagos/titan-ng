import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Unit } from 'src/app/core/models/category.enum';
import { Storage, StorageFull } from 'src/app/core/models/storage.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-edit-inventory-dialog',
  templateUrl: './edit-inventory-dialog.component.html',
  styleUrl: './edit-inventory-dialog.component.scss'
})
export class EditInventoryDialogComponent implements OnInit {
  editInventoryForm: FormGroup

  units: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: {inv: StorageFull},
    private snackbarService: SnackbarService,
    private matDialogRef: MatDialogRef<EditInventoryDialogComponent>,
  ) {
    this.editInventoryForm = this.formBuilder.group({
      name: new FormControl(data.inv.name, Validators.required),
      pricePerBottle: new FormControl(data.inv.pricePerBottle, Validators.required),
      stockOfBottles: new FormControl(data.inv.stockOfBottles, Validators.required),
      currentStock: new FormControl(data.inv.currentStock, Validators.required),
      criticalStockOfBottles: new FormControl(data.inv.criticalStockOfBottles, Validators.required),
      unit: new FormControl(data.inv.unit, Validators.required),
      measurement: new FormControl(data.inv.measurement, Validators.required)
    })
  }

  ngOnInit() {
    this.units = Object.keys(Unit).filter((item) => {
      return isNaN(Number(item))
    })
  }

  editInventory() {
    if (this.editInventoryForm.valid) {
      let request: Storage = {
        name: this.editInventoryForm.get('name')?.value,
        pricePerBottle: this.editInventoryForm.get('pricePerBottle')?.value,
        stockOfBottles: this.editInventoryForm.get('stockOfBottles')?.value,
        currentStock: this.editInventoryForm.get('currentStock')?.value,
        unit: this.editInventoryForm.get('unit')?.value,
        measurement: this.editInventoryForm.get('measurement')?.value,
        criticalStockOfBottles: this.editInventoryForm.get('criticalStockOfBottles')?.value
      }
      this.storageService.editInventory(this.data.inv.id, request).subscribe({
        next: (data) => {
          this.snackbarService.snackbarSuccess(`Edited ${data.name}`, "Done")
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
