import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router, Scroll } from '@angular/router';
import { TableFull } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';

import { MatDialog } from '@angular/material/dialog';
import { PinDialogComponent } from '../authentication/pin-dialog/pin-dialog.component';
import { TransferService } from 'src/app/core/services/transfer.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnDestroy {
  loading = true
  tables: TableFull[] = []
  tables$ = this.tableService.tables

  private timer: any
  private timeout: number = 30000
  private isDialogOpen = false;

  private productSubscription: Subscription

  constructor(
    private readonly tableService: TableService,
    private router: Router,
    private matDialog: MatDialog,
    private transferService: TransferService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        if (event?.routerEvent.url === '/nav/table') {
          this.loadTables()
        }
      }
    })
    this.dialog()
    //this.startTimer()
    this.productSubscription = this.transferService.products$.subscribe((data) => {
      if (data.length > 0) {
        this.toGo()
      }
    })
  }

  ngOnInit() {
    document.addEventListener('click', this.resetTimer.bind(this))
    document.addEventListener('keydown', this.resetTimer.bind(this))
    document.addEventListener('mousemove', this.resetTimer.bind(this))
  }

  ngOnDestroy() {
    this.productSubscription.closed
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
    this.isDialogOpen = true
    const dialogRef = this.matDialog.open(PinDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(() => {
      clearTimeout(this.timer)
      this.startTimer()
      this.isDialogOpen = false
    })
  }

  startTimer() {
    if (!this.isDialogOpen) {
      this.timer = setTimeout(() => {
        this.isDialogOpen = true
        this.dialog()
      }, this.timeout)
      this.isDialogOpen = false
    }
  }

  resetTimer() {
    clearTimeout(this.timer)
    this.startTimer()
  }

  toGo() {
    this.router.navigate(['/nav/togo'])
  }
}
