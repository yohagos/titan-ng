import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragRelease, CdkDragStart, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableAddRequest, TableFull, Tile } from 'src/app/core/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent implements AfterViewInit, AfterContentChecked {
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  //@ViewChildren(CdkDrag) tablesContainer!: QueryList<CdkDrag>
  @ViewChildren("tablesChildren") tablesRef!: ElementRef
  tables$: Observable<TableFull[]>

  objects: { x: number; y: number, id: number }[] = [];

  changesDetected = false

  tiles: Tile[] = [];

  constructor(
    private tableService: TableService,
    public matDialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {
    this.tables$ = this.tableService.tables
    this.tableService.getTiles().subscribe(
      data => {
        this.tiles = data
      }
    )

    this.changeDetectionEmitter.subscribe(event => {
      this.changesDetected = true
    })
  }

  ngAfterViewInit(): void {
    const element = this.tablesRef.nativeElement.children
    console.log(element)
    const firstChild = element.querySelector(':first-child')
    console.log(firstChild)
  }

  ngAfterContentChecked() {
    this.tableService.changeDetectionEmitter.subscribe(() => {
      this.changesDetected = true
    })

  }

  getPositions() {
    console.log(this.tableService.getAllTables())
    /* this.tablesContainer.forEach((obj) => {
      const freePosition = obj.getFreeDragPosition()
      const rootElement = obj.getRootElement()
      //console.log('Table: ', obj.element.nativeElement.textContent, ' root element ',rootElement, ' free position ', freePosition)
      if (obj.element.nativeElement.textContent && (freePosition.x !== 0 || freePosition.y !== 0)) {
        this.tableService.updateTable(+obj.element.nativeElement.textContent, freePosition.x/10, freePosition.y/10)
      }
    }) */
  }

  dragStarted(event: CdkDragStart) {
    this.changeDetectionEmitter.emit()
  }

  addNewTable() {
    const dialogRef = this.matDialog.open(AddTableDialogComponent, {
      width: '300px'
    })
    /* dialogRef.afterClosed().subscribe(
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
    ) */
  }


  updateAllPositions() {
    this.getPositions()
    /* this.tableService.saveTableArrangements().subscribe({
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
    }) */
  }

}
