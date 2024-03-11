import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragMove, CdkDragRelease, CdkDragStart, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { animate, keyframes, style, transition, trigger, state } from "@angular/animations";
import { TableService } from 'src/app/core/services/table.service';
import { TableAddRequest, TableFull } from 'src/app/core/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTableDialogComponent } from './add-table-dialog/add-table-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent implements AfterViewInit {
  @ViewChild('boundary') boundary!: ElementRef<HTMLElement>
  @ViewChildren('tablesList') childElements: QueryList<ElementRef>  = new QueryList()
  //changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  //changesDetected = false

  tables: TableFull[] = []
  tablesPositionState = 'void'

  parentArea: any

  isGreen = true

  constructor(
    private tableService: TableService,
    public matDialog: MatDialog,
    private _snackbar: MatSnackBar,
    private renderer: Renderer2
  ) {
    this.tableService.tables.subscribe(tables => {
      this.tables = tables
    })
    /* this.changeDetectionEmitter.subscribe(event => {
      this.changesDetected = true
    }) */
  }

  ngAfterViewInit() {
    this.reloadTables()
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
          const nativeElement = item.nativeElement.getBoundingClientRect();
          const translateX = this.calculateOffsetX(nativeElement, this.parentArea, table.positionX);
          const translateY = this.calculateOffsetY(nativeElement, this.parentArea, table.positionY);

          this.renderer.setStyle(item.nativeElement, 'left', `${translateX}px`)
          this.renderer.setStyle(item.nativeElement, 'top', `${translateY}px`)
        }
      });
      this.tablesPositionState = 'start';
    }, 100);
  }

  calculateOffsetX(elementRect: DOMRect, parentRect: DOMRect, targetX: number): number {
    const availableWidth = parentRect.width - elementRect.width;
    targetX = Math.max(0, Math.min(targetX, availableWidth))
    return targetX
  }

  calculateOffsetY(elementRect: DOMRect, parentRect: DOMRect, targetY: number): number {
    const availableHeight = parentRect.height - elementRect.height;
    targetY = Math.max(0, Math.min(targetY, availableHeight))
    return targetY;
  }

  adjustWidth(num: number) {
    return num * 15
  }

  localDragReleased(event: CdkDragRelease, item: TableFull) {
    const mouseEvent: MouseEvent = event.event as MouseEvent
    //console.log(`Mouse event: ${item.tableNumber}`,mouseEvent.clientX, ' ', mouseEvent.clientY)
    this.childElements.forEach(child => {
      if (child.nativeElement.innerText === item.tableNumber) {
        child.nativeElement.style.left = mouseEvent.clientX + 'px'
        child.nativeElement.style.top = mouseEvent.clientY + 'px'
      }
    })
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

  updateAllPositions() {
    this.childElements.forEach((item: ElementRef) =>{
      const table = this.tables.find(t => t.tableNumber == item.nativeElement.innerText)
      if (table) {
        console.log(`item ${item.nativeElement.innerText}: `,item.nativeElement.style.left, ' ', item.nativeElement.style.top)
        setTimeout(() => {
          console.log(table)
          //console.log(item.nativeElement?.offsetLeft)
          let left: string = item.nativeElement?.style.left
          let top: string = item.nativeElement?.style.top
          table.positionX = parseInt(left.slice(0, -2), 10)
          table.positionY = parseInt(top.slice(0, -2), 10)
          console.log(table)
        }, 20);
      }
    })
    this.tableService.updateTableObservable(this.tables)
  }
}
