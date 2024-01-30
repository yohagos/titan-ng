import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { TransactionFull } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-balance-data-source',
  templateUrl: './balance-data-source.component.html',
  styleUrl: './balance-data-source.component.scss'
})
export class BalanceDataSourceComponent implements DataSource<TransactionFull> {
  private transactionSubject = new BehaviorSubject<TransactionFull[]>([])
  private loadingSubject = new BehaviorSubject<boolean>(false)
  public loading$ = this.loadingSubject.asObservable()
  filter!: string;

  constructor(
    private transactionService: TransactionService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<TransactionFull[]> {
    return this.transactionSubject.asObservable()
  }

  //disconnect(collectionViewer: CollectionViewer) {
  disconnect() {
    this.transactionSubject.complete()
    this.loadingSubject.complete()
  }

  loadTransactions(filterDate?: Date) {
    if (!filterDate) {
      filterDate = new Date()
    }
    let formattedDateTime = filterDate.toISOString().split('T')[0]
    this.transactionService.getTransactionsForDate(formattedDateTime).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      transactions => {
        this.transactionSubject.next(transactions)
      }
    )
  }

  getTransactions() {
    return this.transactionSubject.asObservable()
  }

}
