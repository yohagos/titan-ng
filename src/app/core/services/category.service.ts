import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryFull } from '../models/category.model';

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

  addCategory(body: Category) {
    return this.http.post('category/add', body, {withCredentials: true})
  }

}
