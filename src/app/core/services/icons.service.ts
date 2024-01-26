import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icons } from '../models/icons.model';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(
    private http: HttpClient
  ) { }

  getIconsList() {
    return this.http.get<Icons[]>('icons')
  }
}
