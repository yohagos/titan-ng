import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageFull } from '../models/storage.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient
  ) { }

  getInventory() {
    return this.http.get<StorageFull[]>('storages')
  }
}
