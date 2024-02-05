import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from 'src/app/core/models/category.enum';
import { StorageFull } from 'src/app/core/models/storage.model';
import { StorageService } from 'src/app/core/services/storage.service';

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
    @Inject(MAT_DIALOG_DATA) public data: {inv: StorageFull}
  ) {
    this.editInventoryForm = this.formBuilder.group({
      name: data.inv.name,
      pricePerBottle: data.inv.pricePerBottle,
      stockOfBottles: data.inv.stockOfBottles,
      currentStock: data.inv.currentStock,
      criticalStockOfBottles: data.inv.criticalStockOfBottles,
      unit: data.inv.unit,
      measurement: data.inv.measurement
    })
  }

  ngOnInit() {
    this.units = Object.keys(Unit).filter((item) => {
      return isNaN(Number(item))
    })
  }

}
