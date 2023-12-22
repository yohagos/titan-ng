import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from "rxjs";
import { ProductFull } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private productsSubject: BehaviorSubject<ProductFull[]> = new BehaviorSubject<ProductFull[]>([])
  public products$ = this.productsSubject.asObservable()

  constructor() { }

  addProduct(item: ProductFull) {
    const currentProducts = this.productsSubject.value
    currentProducts.push(item)
    this.productsSubject.next(currentProducts)
  }

  clear() {
    this.productsSubject.next([])
  }

}
