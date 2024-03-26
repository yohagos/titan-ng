import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent implements OnInit, AfterContentInit {
  dataSource: any
  displayColumns = ['name', 'price', 'stock', 'currentStock', 'criticalStock', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  storage$: Observable<StorageFull[]> = new Observable<StorageFull[]>()

  storageValue = 0

  constructor(
    private storageService: StorageService,
    private matDialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackbarService: SnackbarService,
  ) {

  }

  ngOnInit() {
    this.dataSource = new StorageDataSource(this.storageService)
    this.loadData()
    this.storage$ = this.dataSource.getInventory()
    this.dataSource.sort = this.sort
  }

  ngAfterContentInit() {
    this.storageService.getStorageValue().subscribe(data => {
      this.storageValue = data
    })
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
    dialog.afterClosed().subscribe(
      () => {
        this.loadData()
      }
    )
  }

  deleteInventory(id: number) {
    this.confirmService.confirm().subscribe(
      (result) => {
        if (result) {
          this.storageService.deleteInventory(id).subscribe({
            next: (data) => {
              this.snackbarService.snackbarSuccess(`Deleted ${data.name}`, "Done")
              this.loadData()
            },
            error: (err) => {
              this.snackbarService.snackbarError(`Error: ${err}`, 'Try Again!!')
            }
          })
        }
      }
    )
  }

  // utils

  formatDecimal(val: any) {
    if (!val) return '-'
    return val.toFixed(2)
  }

}
