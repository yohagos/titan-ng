import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { BehaviorSubject, Observable, find } from "rxjs";
import { TableAddRequest, TableFull, Tile } from '../models/table.model';
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

  removeTable(table: TableFull) {
    const currentTables = this.tablesSubject.getValue()
    const updatedTables = currentTables.filter(t => t.id !== table.id)
    this.tablesSubject.next(updatedTables)

  }

  updateTableObservable(tables: TableFull[]) {
    this.tablesSubject.next(tables)
    this.changeDetectionEmitter.emit()

    console.log('update table observable')
    this.saveTableArrangements(tables).subscribe({
      next: () => {
        this.reloadTables()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  // Backend Calls

  loadTables() {
    return this.http.get<TableFull[]>('table')
  }

  addTable(table: TableFull) {
    const newTable : TableAddRequest = {
      tableNummer: table.tableNumber,
      numberOfPeople: table.numberOfPeople
    }
    return this.http.post('table/add', newTable, {withCredentials: true})
  }

  getProductsForTable(id: number) {
    return this.http.get<ProductFull[]>(`table/${id}`)
  }

  storeProductToTable(id: number, products: ProductFull[]) {
    return this.http.put(`table/store/${id}`, products, {withCredentials: true})
  }

  saveTableArrangements(tables: TableFull[]) {
    //let tables = this.tablesSubject.value
    //console.log(tables)
    return this.http.put('table', tables, {withCredentials: true})
  }



  // Tables tiles
  getTiles() {
    return this.http.get<Tile[]>('table/tiles')
  }
}
