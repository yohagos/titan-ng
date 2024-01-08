import { AfterContentChecked, Component } from '@angular/core';
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableAddRequest, TableFull } from 'src/app/core/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent implements AfterContentChecked {
  tables$ = this.tableService.tables

  changesDetected = false

  constructor(
    private tableService: TableService,
    public matDialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngAfterContentChecked() {
    this.tableService.changeDetectionEmitter.subscribe(() => {
      this.changesDetected = true
    })
  }

  addNewTable() {
    const dialogRef = this.matDialog.open(AddTableDialogComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(
      (data: TableAddRequest) => {
        data.positionX = 1
        data.positionY = 1
        this.tableService.addTable(data).subscribe({
          next: () => {
            this.tableService.reloadTables()
            this.changesDetected = !this.changesDetected
          },
          error: (err) => {
            this._snackbar.open(err, 'Close', {
              duration: 3500,
              panelClass: ['snackbarError'],
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        })
      }
    )
  }

  tablePosition(table: TableFull) {
    return {x: table.positionX, y: table.positionY}
  }

  checkTableSize(size: number) {
    switch(size) {
      case 2: return 'two-pair-table.jpg'
      case 4: return 'four-pair-table.jpg'
      case 6: return 'six-pair-table.jpg'
      default: return 'two-pair-table.jpg'
    }
  }

  dragEnded(event: CdkDragEnd, item: TableFull) {
    console.log({item})
    let tabs = this.tableService.getAllTables()
    console.table(tabs)
    let table = tabs.find(tab => tab.id == item.id)
    if (table != null) {
      table.positionX = event.source.getFreeDragPosition().x
      table.positionY = event.source.getFreeDragPosition().y
    }
    console.table(tabs)
    this.tableService.updateTableObservable(tabs)
  }

  updateAllPositions() {
    this.tableService.saveTableArrangements().subscribe({
      next: () => {
        this.tableService.reloadTables()
        this.changesDetected = !this.changesDetected
      },
      error: (err) => {
        this._snackbar.open(err, 'Close', {
          duration: 3500,
          panelClass: ['snackbarError'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

}
