import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragMove, CdkDragRelease, CdkDragStart, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { animate, keyframes, style, transition, trigger, state } from "@angular/animations";
import { TableService } from 'src/app/core/services/table.service';
import { TableAdd, TableAddRequest, TableFull } from 'src/app/core/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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

    /* console.log(this.boundaryOffsetLeft)
    console.log(this.boundaryOffsetTop)
    console.log(this.boundaryOffsetHeight)
    console.log(this.boundaryOffsetWidth) */
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
          //const nativeElement = item.nativeElement.getBoundingClientRect();
          const translateX = table.positionX - this.boundaryOffsetLeft
          const translateY = table.positionY - this.boundaryOffsetTop

          if (table) {
            console.log(table.tableNumber, ' ',table.positionX, ' ', table.positionY)
          }

          this.renderer.setStyle(item.nativeElement, 'left', `${translateX}px`)
          this.renderer.setStyle(item.nativeElement, 'top', `${translateY}px`)

          if (table.tableNumber === 210) {
            console.log('left: ', item.nativeElement.style['left'])
            console.log('top: ', item.nativeElement.style['top'])
          }
        }
      });
    }, 100);
  }

  /* calculateOffsetX(elementRect: DOMRect, parentRect: DOMRect, targetX: number): number {
    const availableWidth = parentRect.width - elementRect.width;
    targetX = Math.max(0, Math.min(targetX, availableWidth))
    return targetX //+ availableWidth / 2
  }

  calculateOffsetY(elementRect: DOMRect, parentRect: DOMRect, targetY: number): number {
    const availableHeight = parentRect.height - elementRect.height;
    targetY = Math.max(0, Math.min(targetY, availableHeight))
    return targetY //+ availableHeight / 2
  } */

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
      console.log('Mouseevent: ', mouseEvent.clientX, ' ', mouseEvent.clientY)
      const dom = event.source.element.nativeElement.getBoundingClientRect()
      /* item.positionX = this.boundaryOffsetLeft + mouseEvent.clientX // - dom.left
      item.positionY = this.boundaryOffsetTop + mouseEvent.clientY // - dom.top */
      item.positionX = mouseEvent.clientX // - dom.left
      item.positionY = mouseEvent.clientY // - dom.top


        console.log(item.tableNumber, ' ',item.positionX, ' ', item.positionY)

    }
    this.tableSet.add(item)
    console.log(this.tableSet)
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
            this.snackbarService.snackbarError(err, err)
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
      console.log(table)
      const tab = tabs.find(t => t.id === table.id)
      if (tab) {
        tab.positionX = table.positionX
        tab.positionY = table.positionY
        console.log(tab)
      }
    }

    this.tableService.updateTableObservable(tabs)
    setTimeout(() => {
      window.location.reload()
    }, 30)

  }

  /* getAllPositions() {
    const boundary = this.boundary?.nativeElement?.getBoundingClientRect();
      if (boundary) {
        this.parentArea = boundary;
      }

      this.childElements.forEach((item: ElementRef) => {
        if (item.nativeElement.innerText === '210') {
          const tableNumber = parseInt(item.nativeElement.innerText);
          const table = this.tables.find(t => t.tableNumber === tableNumber);
          if (table) {
            const nativeElement = item.nativeElement.getBoundingClientRect();
            const translateX = this.calculateOffsetX(nativeElement, this.parentArea, table.positionX);
            const translateY = this.calculateOffsetY(nativeElement, this.parentArea, table.positionY);
            console.log(table.tableNumber, ' ', translateX, ' ', translateY)
          }
        }
      });
  } */
}
