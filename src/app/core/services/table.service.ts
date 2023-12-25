import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

import { BehaviorSubject } from "rxjs";
import { TableAddRequest, TableFull } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jwtService: JwtService
  ) { }

  loadTables() {
    return this.http.get<TableFull[]>('table')
  }

  addTable(table: TableAddRequest) {
    return this.http.post('table', table, {withCredentials: true})
  }


}
