import { AfterViewInit, Component, ElementRef, EventEmitter, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragRelease } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableAdd, TableFull } from 'src/app/core/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { EditTableDialogComponent } from './edit-table-dialog/edit-table-dialog.component';


@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent implements AfterViewInit {
  @ViewChild('boundary') boundary!: ElementRef<HTMLElement>
  @ViewChildren('tablesList') childElements: QueryList<ElementRef>  = new QueryList()
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  changesDetected = false

  tables: TableFull[] = []
  tableSet: Set<TableFull> = new Set()

  parentArea: any

  boundaryOffsetLeft!: number
  boundaryOffsetTop!: number
  boundaryOffsetHeight!: number
  boundaryOffsetWidth!: number

  isGreen = true

  constructor(
    private tableService: TableService,
    public matDialog: MatDialog,
    private snackbarService: SnackbarService,
    private renderer: Renderer2
  ) {
    this.loadTables()
    this.reloadTables()
  }

  ngAfterViewInit() {
    this.parentArea = this.boundary.nativeElement
    this.boundaryOffsetLeft = this.parentArea.offsetLeft
    this.boundaryOffsetTop = this.parentArea.offsetTop
    this.boundaryOffsetHeight = this.parentArea.offsetHeight
    this.boundaryOffsetWidth = this.parentArea.offsetWidth
  }

  loadTables() {
    this.tableService.tables.subscribe(tables => {
      this.tables = tables
    })
  }

  reloadTables() {
    setTimeout(() => {
      const boundary = this.boundary?.nativeElement?.getBoundingClientRect();
      if (boundary) {
        this.parentArea = boundary;
      }

      this.childElements.forEach((item: ElementRef) => {
        const tableNumber = parseInt(item.nativeElement.innerText);
        const table = this.tables.find(t => t.tableNumber === tableNumber);
        if (table) {
          const translateX = table.positionX - this.boundaryOffsetLeft
          const translateY = table.positionY - this.boundaryOffsetTop

          this.renderer.setStyle(item.nativeElement, 'left', `${translateX}px`)
          this.renderer.setStyle(item.nativeElement, 'top', `${translateY}px`)
        }
      });
    }, 100);
  }


  adjustWidth(num: number) {
    if (num === 2) {
      return num * 25
    }
    return num * 15
  }

  localDragReleased(event: CdkDragRelease, item: TableFull) {
    this.changesDetected = true
    const mouseEvent: MouseEvent = event.event as MouseEvent
    if (event.source.element) {
      const dom = event.source.element.nativeElement.getBoundingClientRect()
      item.positionX = mouseEvent.clientX
      item.positionY = mouseEvent.clientY
    }
    this.tableSet.add(item)
  }

  addNewTable() {
    const dialogRef = this.matDialog.open(AddTableDialogComponent, {
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(
      (data: TableAdd) => {
        this.tableService.addTable(data).subscribe({
          next: () => {
            this.tableService.reloadTables()
            this.snackbarService.snackbarSuccess('Added new Table', 'Done')
          },
          error: (err) => {
            this.snackbarService.snackbarError(err, 'Error')
          }
        })
      }
    )
  }

  editTables() {
    const dialogRef = this.matDialog.open(EditTableDialogComponent, {
      width: '600px',
      height: '400px',
      data: {tables: this.tables}
    })
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.loadTables()
      }
    })
  }

  updateAllPositions() {
    const tabs = this.tables
    for (const table of this.tableSet) {
      const tab = tabs.find(t => t.id === table.id)
      if (tab) {
        tab.positionX = table.positionX
        tab.positionY = table.positionY
      }
    }
    this.tableService.updateTableObservable(tabs)
    setTimeout(() => {
      window.location.reload()
    }, 30)
  }
}
