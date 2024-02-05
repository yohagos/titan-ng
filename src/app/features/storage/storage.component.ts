import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/core/services/storage.service';
import { StorageDataSource } from './storageDataSource';
import { Observable } from 'rxjs';
import { StorageFull } from 'src/app/core/models/storage.model';
import { MatSort } from '@angular/material/sort';
import { UtilService } from 'src/app/shared/services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInventoryDialogComponent } from './add-inventory-dialog/add-inventory-dialog.component';
import { EditInventoryDialogComponent } from './edit-inventory-dialog/edit-inventory-dialog.component';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent implements OnInit {
  dataSource: any
  displayColumns = ['name', 'price', 'stock', 'currentStock', 'criticalStock', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  storage$: Observable<StorageFull[]> = new Observable<StorageFull[]>()

  constructor(
    private storageService: StorageService,
    private matDialog: MatDialog,

  ) {

  }

  ngOnInit() {
    this.dataSource = new StorageDataSource(this.storageService)
    this.loadData()
    this.storage$ = this.dataSource.getInventory()
    this.dataSource.sort = this.sort
  }

  loadData() {
    this.dataSource.loadInventory()
  }

  openAddInventoryDialog() {
    const dialog =this.matDialog.open(AddInventoryDialogComponent, {
      width: '500px'
    })
    dialog.afterClosed().subscribe(
      () => {
        this.loadData()
      }
    )
  }

  openEditInventoryDialog(data: StorageFull) {
    const dialog = this.matDialog.open(EditInventoryDialogComponent, {
      width: '500px',
      data: {inv: data}
    })
  }

  // utils

  formatDecimal(val: any) {
    if (!val) return '-'
    return val.toFixed(2)
  }

}
