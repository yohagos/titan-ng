import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage, StorageFull } from '../models/storage.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageValueSubject: BehaviorSubject<number> = new BehaviorSubject(0)
  storageValue = this.storageValueSubject.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  setStorageValue(sum: number) {
    this.storageValueSubject.next(sum)
  }

  getStorageValue() {
    return this.storageValue
  }


  getInventory() {
    return this.http.get<StorageFull[]>('storages')
  }

  addInventory(request: Storage) {
    return this.http.post<StorageFull>('storages/add', request, {withCredentials: true})
  }

  editInventory(id: number, request: Storage) {
    return this.http.put<StorageFull>(`storages/${id}`, request, {withCredentials: true})
  }

  deleteInventory(id: number) {
    return this.http.delete<StorageFull>(`storages/${id}`)
  }
}
