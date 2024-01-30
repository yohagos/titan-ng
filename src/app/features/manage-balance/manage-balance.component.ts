import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionFull } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { BalanceDataSourceComponent } from './balance-data-source/balance-data-source.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-manage-balance',
  templateUrl: './manage-balance.component.html',
  styleUrl: './manage-balance.component.scss'
})
export class ManageBalanceComponent implements OnDestroy {
  dataSource!: BalanceDataSourceComponent
  displayedColums = ['id', 'price', 'tip', 'procent', 'withCard', 'cardNumber', 'user']
  @ViewChild(MatSort) sort!: MatSort

  filterText = ''
  loading = true

  filterDate!: Date

  private transactionSubject = new BehaviorSubject<TransactionFull[]>([])
  private loadingSubject = new BehaviorSubject<boolean>(false)

  constructor(
    public utilService: UtilService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.dataSource = new BalanceDataSourceComponent(this.transactionService)
    this.loadData()
  }

  ngOnDestroy() {
    this.dataSource.disconnect()
  }

  loadData(selectedDate?: Date) {
    this.dataSource.loadTransactions(selectedDate)
  }

  onDateChange(selectedDate: MatDatepickerInputEvent<any>) {
    this.loadData(selectedDate.value)
  }

  // Extras

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
