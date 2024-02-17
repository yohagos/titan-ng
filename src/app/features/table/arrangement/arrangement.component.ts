import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
export class ArrangementComponent implements AfterContentChecked {
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  @ViewChildren(CdkDrag) tablesContainer!: QueryList<CdkDrag>
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

  ngAfterContentChecked() {
    this.tableService.changeDetectionEmitter.subscribe(() => {
      this.changesDetected = true
    })
  }

  getPositions() {
    console.log(this.tableService.getAllTables())
    this.tablesContainer.forEach((obj) => {
      const freePosition = obj.getFreeDragPosition()
      const rootElement = obj.getRootElement()
      //console.log('Table: ', obj.element.nativeElement.textContent, ' root element ',rootElement, ' free position ', freePosition)
      if (obj.element.nativeElement.textContent) {
        this.tableService.updateTable(+obj.element.nativeElement.textContent, freePosition.x, freePosition.y)
      }
    })
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

  tablePosition(table: TableFull) {
    /* return {x: table.positionX, y: table.positionY} */
  }

  checkTableSize(size: number) {
    /* switch(size) {
      case 2: return 'two-pair-table.jpg'
      case 4: return 'four-pair-table.jpg'
      case 6: return 'six-pair-table.jpg'
      default: return 'two-pair-table.jpg'
    } */
  }

  dragEnded(event: CdkDragEnd, item: TableFull) {
    /* let tabs = this.tableService.getAllTables()
    let table = tabs.find(tab => tab.id == item.id)
    if (table != null) {
      table.positionX = event.source.getFreeDragPosition().x
      table.positionY = event.source.getFreeDragPosition().y
    }
    this.tableService.updateTableObservable(tabs) */
/*     console.table(item)
    console.table(event) */
  }

  dragDropped(event: CdkDragDrop<TableFull>) {
    //console.table(event)
  }

  dragReleased(event: CdkDragRelease<any>, table: TableFull) {
    /* console.log(event.source.getFreeDragPosition())
    table.positionX = event.source.element.nativeElement.getBoundingClientRect().left
    table.positionY = event.source.element.nativeElement.getBoundingClientRect().top
    console.log(table) */
  }

  dropTable(event: CdkDragDrop<TableFull[] | null, any, any>) {
    /* const { item, currentIndex, previousIndex, container } = event
    const tables = container.data

    const tableToMove = item.data

    const posX = event.distance.x + tableToMove.positionX
    const posY = event.distance.y + tableToMove.positionY

    this.tables$ = this.tables$.pipe(
      map(tables =>
        tables.map(table =>
          (table.id === tableToMove.id) ? {...table, positionX: posX, positionY: posY} : table
        )
      )
    ) */
  }

  updateAllPositions() {
    this.getPositions()
    console.log('done')
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
