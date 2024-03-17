import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragMove, CdkDragRelease, CdkDragStart, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { animate, keyframes, style, transition, trigger, state } from "@angular/animations";
import { TableService } from 'src/app/core/services/table.service';
import { TableAddRequest, TableFull } from 'src/app/core/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


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
    this.tableService.tables.subscribe(tables => {
      this.tables = tables
      //console.log(this.tables)
    })
    /* this.changeDetectionEmitter.subscribe(event => {
      this.changesDetected = true
    }) */

    this.reloadTables()
  }

  ngAfterViewInit() {
    //this.reloadTables()

    this.parentArea = this.boundary.nativeElement
    this.boundaryOffsetLeft = this.parentArea.offsetLeft
    this.boundaryOffsetTop = this.parentArea.offsetTop
    this.boundaryOffsetHeight = this.parentArea.offsetHeight
    this.boundaryOffsetWidth = this.parentArea.offsetWidth

    /* console.log(this.boundaryOffsetHeight)
    console.log(this.boundaryOffsetWidth)
    console.log(this.boundaryOffsetLeft)
    console.log(this.boundaryOffsetTop) */
  }

  reloadTables() {
    setTimeout(() => {
      //console.log('reloadTables')
      const boundary = this.boundary?.nativeElement?.getBoundingClientRect();
      if (boundary) {
        this.parentArea = boundary;
      }

      this.childElements.forEach((item: ElementRef) => {
        const tableNumber = parseInt(item.nativeElement.innerText);
        const table = this.tables.find(t => t.tableNumber === tableNumber);
        if (table) {
          const nativeElement = item.nativeElement.getBoundingClientRect();
          const translateX = table.positionX
          const translateY = table.positionY

          if (table.tableNumber === 210) {
            console.log(table.tableNumber, ' ',table.positionX, ' ', table.positionY)
          }

          this.renderer.setStyle(item.nativeElement, 'left', `${translateX}px`)
          this.renderer.setStyle(item.nativeElement, 'top', `${translateY}px`)
        }
      });
    }, 100);
  }

  calculateOffsetX(elementRect: DOMRect, parentRect: DOMRect, targetX: number): number {
    const availableWidth = parentRect.width - elementRect.width;
    targetX = Math.max(0, Math.min(targetX, availableWidth))
    return targetX //+ availableWidth / 2
  }

  calculateOffsetY(elementRect: DOMRect, parentRect: DOMRect, targetY: number): number {
    const availableHeight = parentRect.height - elementRect.height;
    targetY = Math.max(0, Math.min(targetY, availableHeight))
    return targetY //+ availableHeight / 2
  }

  adjustWidth(num: number) {
    return num * 15
  }

  localDragReleased(event: CdkDragRelease, item: TableFull) {
    this.changesDetected = true
    //console.log(item.positionX, ' ', item.positionY)
    const mouseEvent: MouseEvent = event.event as MouseEvent
    //console.log(mouseEvent.clientX, ' ', mouseEvent.clientY)
    //item.positionX = mouseEvent.clientX
    //item.positionY = mouseEvent.clientY
    if (event.source.element) {
      const dom = event.source.element.nativeElement.getBoundingClientRect()
      //item.positionX = this.calculateOffsetX(dom, this.parentArea, mouseEvent.clientX)
      //item.positionY = this.calculateOffsetX(dom, this.parentArea, mouseEvent.clientY)
      item.positionX = mouseEvent.clientX // - dom.left
      item.positionY = mouseEvent.clientY // - dom.top

      if (item.tableNumber === 210) {
        console.log(item.tableNumber, ' ',item.positionX, ' ', item.positionY)
      }
    }
    //console.log(event)
    //console.log(item.positionX, ' ', item.positionY)
    //console.log(mouseEvent)
    this.tableSet.add(item)
    console.log(this.tableSet)
  }

  addNewTable() {
    const dialogRef = this.matDialog.open(AddTableDialogComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(
      (data: TableFull) => {
        data.positionX = 1
        data.positionY = 1
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

  updateAllPositions() {
    //console.log(this.tableSet)

    const tabs = this.tables
    //console.log(tabs)
    for (const table of this.tableSet) {
      const tab = tabs.find(t => t.id === table.id)
      if (tab) {
        tab.positionX = table.positionX
        tab.positionY = table.positionY
      }
    }
    //console.log(tabs)
    //this.childElements.forEach((item: ElementRef) =>{
      /* if (item.nativeElement.innerText === '210') {
        console.log(item.nativeElement.style.left, ' ', item.nativeElement.style.top)
        console.log(item)
      } */

      /* const table = this.tables.find(t => t.tableNumber == item.nativeElement.innerText)
      console.log(table?.positionX, ' ', table?.positionY) */
      /* const table = this.tables.find(t => t.tableNumber == item.nativeElement.innerText)
      if (table) {
        //console.log(`item ${item.nativeElement.innerText}: `,item.nativeElement.style.left, ' ', item.nativeElement.style.top)
        //setTimeout(() => {
          //console.log(table)
          //console.log(item.nativeElement?.offsetLeft)
          let left: string = item.nativeElement?.style.left
          let top: string = item.nativeElement?.style.top
          console.log(`UPDATE from -> ${item.nativeElement.innerText}: `, left, ' ', top)
          table.positionX = parseInt(left.slice(0, -2), 10)
          table.positionY = parseInt(top.slice(0, -2), 10)

          console.log(`UPDATE -> table ${table.tableNumber} : `, table.positionX, ' ', table.positionY)
          //console.log(table)
        //}, 20);
      } */
    //})
    /* setTimeout(() => {
      //console.log(this.tables)
    }, 300) */
    this.tableService.updateTableObservable(tabs)
    setTimeout(() => {
      window.location.reload()
    }, 30)
    //this.reloadTables()
    //this.getAllPositions()

    //this.changesDetected = !this.changesDetected
  }

  getAllPositions() {
    const boundary = this.boundary?.nativeElement?.getBoundingClientRect();
      if (boundary) {
        this.parentArea = boundary;
      }

      this.childElements.forEach((item: ElementRef) => {
        if (item.nativeElement.innerText === '210') {
          const tableNumber = parseInt(item.nativeElement.innerText);
          const table = this.tables.find(t => t.tableNumber === tableNumber);
          //console.log(table)
          //console.log(item)
          if (table) {
            const nativeElement = item.nativeElement.getBoundingClientRect();
            const translateX = this.calculateOffsetX(nativeElement, this.parentArea, table.positionX);
            const translateY = this.calculateOffsetY(nativeElement, this.parentArea, table.positionY);
            /* table.positionX = translateX
            table.positionY = translateY */
            console.log(table.tableNumber, ' ', translateX, ' ', translateY)
            //console.log(table?.tableNumber, ' ', table?.positionX, ' ', table?.positionY)
            /* this.renderer.setStyle(item.nativeElement, 'left', `${translateX}px`)
            this.renderer.setStyle(item.nativeElement, 'top', `${translateY}px`) */
          }
        }
      });
  }
}
