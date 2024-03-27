import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionCard, TransactionCash, TransactionFull } from '../models/transaction.model';
import { ProductFull } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTransactions() {
    return this.http.get<TransactionFull[]>('transactions')
  }

  getTransactionsForDate(date: string | null) {
    return this.http.get<TransactionFull[]>(`transactions/${date}`)
  }

  cashTransaction(request: TransactionCash) {
    return this.http.post<TransactionFull>(
      'transactions/cash',
      request

    )
  }

  cardTransaction(request: TransactionCard) {
    return this.http.post<TransactionFull>(
      'transactions/card',
      request,
      {withCredentials: true}
    )
  }

  addProductsToTransaction(id: number, products: ProductFull[]) {
    return this.http.post<TransactionFull>(
      `transactions/${id}`,
      products
    )
  }

  cancelTransaction(id: number) {
    return this.http.delete<TransactionFull>(`transactions/${id}`)
  }
}
