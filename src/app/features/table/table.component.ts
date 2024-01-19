import { Component } from '@angular/core';

import { Router, Scroll } from '@angular/router';
import { TableFull } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';

import { MatDialog } from '@angular/material/dialog';
import { PinDialogComponent } from '../authentication/pin-dialog/pin-dialog.component';
import { TimerService } from 'src/app/core/services/timer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  loading = true
  tables: TableFull[] = []
  tables$ = this.tableService.tables

  constructor(
    private readonly tableService: TableService,
    private router: Router,
    private matDialog: MatDialog,
    private timerService: TimerService,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        if (event?.routerEvent.url === '/nav/table') {
          this.loadTables()
        }
      }
    })
    this.timerService.userInteraction$.subscribe(() => {
      this.dialog()
    })
    this.dialog()
  }

  loadTables() {
    this.tableService.loadTables().subscribe(
      data => {
        this.tables = data
        this.loading = false
      }
    )
  }

  changeColorDependingOnOccupied(table: TableFull) {
    let color = {}
    if (table.occupied) {
      color = {'background-color': '#f57b5d'}
    }
    return color
  }

  occupy(tableID: number) {
    let table = this.tables.find(table => table.id === tableID)
    if (table) {
      table.occupied = !table.occupied
    }
  }

  openTable(table: TableFull) {
    this.router.navigate(['/nav/table', table.id], {queryParams: {...table}, skipLocationChange: true})
  }

  tablePositon(table: TableFull) {
    return {x: table.positionX, y: table.positionY}
  }

  dialog() {
    const dialogRef = this.matDialog.open(PinDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true
    })
  }
}
