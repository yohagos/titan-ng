import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/core/services/storage.service';
import { StorageDataSource } from './storageDataSource';
import { Observable } from 'rxjs';
import { StorageFull } from 'src/app/core/models/storage.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent implements OnInit {
  dataSource: any
  displayColumns = ['name', 'price', 'stock', 'currentStock', 'criticalStock', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  storage$: Observable<StorageFull[]> = new Observable<StorageFull[]>()

  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
    this.dataSource = new StorageDataSource(this.storageService)
    this.loadData()
    this.storage$ = this.dataSource.getInventory()
    this.dataSource.sort = this.sort
  }

  loadData() {
    this.dataSource.loadInventory()
  }

}
