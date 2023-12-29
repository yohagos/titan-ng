import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableFull } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  loading = true
  tables: TableFull[] = []

  constructor(
    private readonly tableService: TableService,
    private router: Router
  ) {
    tableService.loadTables().subscribe(
      data => {
        this.tables = data
        this.loading = false
      }
    )
  }

  changeColorDependingOnOccupied(table: TableFull) {
    let color = {}
    if (table.occupied) {
      color = {'background-color': '#f57b5d'}
    }
    return color
  }

  occupy(tableID: number) {
    let table = this.tables.find(table => table.id === tableID)
    if (table) {
      table.occupied = !table.occupied
    }
  }

  openTable(table: TableFull) {
    this.router.navigate(['/nav/table', table.id], {queryParams: {...table}, skipLocationChange: true})
  }
}
