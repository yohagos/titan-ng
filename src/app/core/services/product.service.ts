import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductAddRequest, ProductEditRequest, ProductFull } from '../models/product.model';

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
    return this.http.post('product/add', product, {withCredentials: true})
  }

  editProduct(product: ProductEditRequest) {
    return this.http.put('product/update', product, {withCredentials: true})
  }

  deleteProduct(id: number) {
    return this.http.delete(`product/${id}`)
  }
}
