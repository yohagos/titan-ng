import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductAddRequest, ProductEditRequest, ProductFull, ProductResponse } from '../models/product.model';
import { ProductStockAddRequest } from '../models/productStock.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jwtService: JwtService
  ) { }

  loadProducts() {
    return this.http.get<ProductFull[]>('product');
  }

  addProduct(product: ProductAddRequest) {
    return this.http.post<ProductResponse>('product/add', product, {withCredentials: true})
  }

  addComponentsToProduct(id: number, items: ProductStockAddRequest[]) {
    return this.http.post(`product/add/${id}`, items)
  }

  editProduct(product: ProductEditRequest) {
    return this.http.put('product/update', product, {withCredentials: true})
  }

  deleteProduct(id: number) {
    return this.http.delete(`product/${id}`)
  }
}
