import { Injectable } from '@angular/core';
import { ProductFull } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  fullPrice = 0.0

  cart: ProductFull[] = []

  constructor() { }

  getCart() {
    return this.cart
  }

  addToCart(item: ProductFull) {
    this.cart.push(item)
    this.printSumOfCart(item)
  }

  printSumOfCart(item: ProductFull) {
    this.fullPrice += item.price
    console.log(this.fullPrice);
  }
}
