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

  removeProduct(name: string) {
    const currentProducts = this.productsSubject.value
    const prodIndex = currentProducts.findIndex((product) => product.name === name)
    if (prodIndex != -1) {
      currentProducts.splice(prodIndex, 1);
    }
    this.productsSubject.next(currentProducts)
  }

  getAllProducts() {
    const currentProducts = this.productsSubject.value
    return currentProducts
  }

  clear() {
    this.productsSubject.next([])
  }
}
