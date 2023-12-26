import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableFull } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent {
  tables: TableFull[] = []


  constructor(
    private tableService: TableService
  ) {
    tableService.loadTables().subscribe(
      (tables) => this.tables = tables
    )
  }

  dragStarted(item: TableFull, event: any) {
    console.log('dragstarted')
    item.positionX = event.distance.x
    item.positionY = event.distance.y
    console.log(event)
    console.log(item)
    console.log(this.tables)
  }

  position(item: TableFull) {
    console.log('position')
    let style = {}

    if (item.positionX > 0 || item.positionY > 0) {
      style = {
        top: `${item.positionY}px`,
        left: `${item.positionX}px`
      }
    }
    return style
  }

  /* gridRows = 20
  gridCols = 50;
  tileSize = 20

  drop(event: CdkDragDrop<TableTest[]>): void {
    const prevIndex = this.tables.findIndex((table: TableTest) => event.item.data === table);
    const newIndex = this.calculateNewIndex(event);
    moveItemInArray(this.tables, prevIndex, newIndex);
  }

  calculateNewIndex(event: CdkDragDrop<TableTest[]>): number {
    const col = Math.floor(event.distance.x / this.tileSize);
  const row = Math.floor(event.distance.y / this.tileSize);

  const newCol = Math.min(Math.max(1, col), this.gridCols);
  const newRow = Math.min(Math.max(1, row), this.gridRows);

  if (event.item.data) {
    return newCol + (newRow - 1) * this.gridCols - 1;
  }

  return 0;
  } */
}

/* interface TableTest {
  id: number;
  name: string;
  col: number;
  row: number;
  rowspan: number;
  colspan: number;
} */

interface Table {
  id: number
  name: string
  positionX: number
  positionY: number
}
