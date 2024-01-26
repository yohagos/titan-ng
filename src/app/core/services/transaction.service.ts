import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionFull } from '../models/transaction.model';

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
}
