import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { BehaviorSubject, Observable, find } from "rxjs";
import { TableAdd, TableAddRequest, TableFull, Tile } from '../models/table.model';
import { ProductFull } from '../models/product.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tablesSubject: BehaviorSubject<TableFull[]> = new BehaviorSubject<TableFull[]>([])
  tables: Observable<TableFull[]> = this.tablesSubject.asObservable()

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly http: HttpClient,
    private snackbarService: SnackbarService
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
    this.saveTableArrangements(tables).subscribe({
      next: () => {
        this.reloadTables()
        this.snackbarService.snackbarSuccess("Updated Table Arrangement", 'Done')
      },
      error: (err) => {
        console.log(err)
        this.snackbarService.snackbarError(err, err)
      }
    })
  }

  // Backend Calls

  loadTables() {
    return this.http.get<TableFull[]>('table')
  }

  addTable(table: TableAdd) {
    return this.http.post('table/add', table, {withCredentials: true})
  }

  getProductsForTable(id: number) {
    return this.http.get<ProductFull[]>(`table/${id}`)
  }

  storeProductToTable(id: number, products: ProductFull[]) {
    return this.http.put(`table/store/${id}`, products, {withCredentials: true})
  }

  saveTableArrangements(tables: TableFull[]) {
    return this.http.put('table', tables, {withCredentials: true})
  }

  // Tables tiles
  getTiles() {
    return this.http.get<Tile[]>('table/tiles')
  }
}
