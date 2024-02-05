import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage, StorageFull } from '../models/storage.model';

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

  addInventory(request: Storage) {
    return this.http.post<StorageFull>('storages/add', request, {withCredentials: true})
  }
}
