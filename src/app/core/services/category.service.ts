import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryFull, CategoryI } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<CategoryFull[]>('category')
  }

  addCategory(body: CategoryI) {
    return this.http.post('category/add', body, {withCredentials: true})
  }

  editCategory(id: number, body: CategoryI) {
    return this.http.put(`category/${id}`, body)
  }

  deleteCategory(id: number) {
    return this.http.delete(`category/${id}`)
  }

}
