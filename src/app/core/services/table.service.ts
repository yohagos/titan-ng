import { HttpClient } from '@angular/common/http';
import { Injectable, ChangeDetectorRef, EventEmitter } from '@angular/core';

import { BehaviorSubject, Observable } from "rxjs";
import { TableAddRequest, TableFull } from '../models/table.model';
import { ProductFull } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tablesSubject: BehaviorSubject<TableFull[]> = new BehaviorSubject<TableFull[]>([])
  tables: Observable<TableFull[]> = this.tablesSubject.asObservable()

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly http: HttpClient
  ) {
    this.reloadTables()
  }

  // Behavioral Functions

  add(table: TableFull) {
    const tables = this.tablesSubject.getValue()
    tables.push(table)
    this.tablesSubject.next(tables)
    this.changeDetectionEmitter.emit()
  }

  reloadTables() {
    this.loadTables().subscribe(data => {
      this.tablesSubject.next(data)
    })
  }

  getAllTables() {
    const tabs = this.tablesSubject.value
    return tabs
  }

  updateTableObservable(tables: TableFull[]) {
    this.tablesSubject.next(tables)
    this.changeDetectionEmitter.emit()
  }


  // Backend Calls

  loadTables() {
    return this.http.get<TableFull[]>('table')
  }

  addTable(table: TableAddRequest) {
    return this.http.post('table/add', table, {withCredentials: true})
  }

  getProductsForTable(id: number) {
    return this.http.get<ProductFull[]>(`table/${id}`)
  }

  storeProductToTable(id: number, products: ProductFull[]) {
    return this.http.put(`table/store/${id}`, products, {withCredentials: true})
  }

  saveTableArrangements() {
    let tables = this.tablesSubject.value
    return this.http.put('table', tables, {withCredentials: true})
  }
}
