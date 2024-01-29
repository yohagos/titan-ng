import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionFull } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-manage-balance',
  templateUrl: './manage-balance.component.html',
  styleUrl: './manage-balance.component.scss'
})
export class ManageBalanceComponent {
  dataSource: any
  displayedColums = ['price', 'tip', 'procent', 'withCard', 'cardNumber', 'user']
  @ViewChild(MatSort) sort!: MatSort

  filterText = ''
  loading = true

  filterDate!: Date

  constructor(
    public utilService: UtilService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    if (!this.filterDate) {
      this.filterDate = new Date()
    }
    let formattedDateTime = this.filterDate.toISOString().split('T')[0]
    this.transactionService.getTransactionsForDate(formattedDateTime).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.loading = false
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearFilter() {
    this.filterText = ''
  }

  formatDecimal(val: any) {
    if (!val) return '-'
    return val.toFixed(2)
  }

  calculateTipAsProcent(element: TransactionFull) {
    const calc = element.price / element.tip
    if (calc.toString() === 'Infinity') return '-'
    if (typeof calc === "number" && !isNaN(calc)) {
      return calc.toFixed(2) + ' %'
    }
    return '-'
  }
}
