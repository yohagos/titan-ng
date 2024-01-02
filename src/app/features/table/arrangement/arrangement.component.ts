import { Component, AfterViewChecked, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragEnd, CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag, CdkDragEnter, CdkDragExit, CdkDragStart, CdkDragRelease } from "@angular/cdk/drag-drop";
import {  } from "@angular/cdk";
import { TableService } from 'src/app/core/services/table.service';
import { TableFull } from 'src/app/core/models/table.model';

interface TEST {
  x: number;
  y: number;
  icon?: string;
  num?: number;
  seats?: number
}

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent {
  /* rows = Array.from({ length: 10 }, (_, index) => index + 1);
  cols = Array.from({ length: 10 }, (_, index) => index + 1);

  @ViewChild("grid", { static: true }) grid!: ElementRef;
  gridWidth = 0
  gridHeight = 0 */

/*   tables = [
    {
        id: 4,
        tableNumber: 210,
        openCosts: 0,
        numberOfPeople: 6,
        occupied: true,
        occupiedFrom: null,
        occupiedTill: null,
        positionX: 5,
        positionY: 11,
        products: []
    },
    {
      id: 5,
      tableNumber: 210,
      openCosts: 0,
      numberOfPeople: 2,
      occupied: true,
      occupiedFrom: null,
      occupiedTill: null,
      positionX: 20,
      positionY: 5,
      products: []
    },
    {
      id: 6,
      tableNumber: 300,
      openCosts: 0,
      numberOfPeople: 4,
      occupied: true,
      occupiedFrom: null,
      occupiedTill: null,
      positionX: 10,
      positionY: 25,
      products: [
          {
              id: 14,
              name: "Martini",
              price: 13,
              category: {
                  id: 2,
                  categoryName: "Cocktail",
                  measurement: 0.3,
                  unit: "ML",
                  color: "#a2a2d0"
              }
          },
          {
              id: 15,
              name: "Negroni",
              price: 11,
              category: {
                  id: 2,
                  categoryName: "Cocktail",
                  measurement: 0.3,
                  unit: "ML",
                  color: "#a2a2d0"
              }
          }
      ]
    }
  ] */

/*   list: TEST[] = [
    {
      x: 7,
      y: 5,
      icon: "check_circle_outline",
      num: 1,
      seats: 2
    },
    {
      x: 10,
      y: 8,
      icon: "check_circle_outline",
      num: 15,
      seats: 4
    },
    {
      x: 3,
      y: 15,
      icon: "check_circle_outline",
      num: 16,
      seats: 6
    },
    {
      x: 17,
      y: 15,
      icon: "check_circle_outline",
      num: 21,
      seats: 2
    },
    {
      x: 27,
      y: 25,
      icon: "check_circle_outline",
      num: 11,
      seats: 2
    },
  ] */

  private dragableElements = 3
  private zonePrefix = 'zone-'
  public dropableObjects: Array<any> = []
  public dragableObjects: Array<Array<any>> = [[], [], []]


  listOfTables: TableFull[] = []

  constructor(
    private tableService: TableService
  ) {
    /*
      this.tableService.loadTables().subscribe(
        data => {
          this.listOfTables = data
        }
      )
    */

    for (let i = 0; i < this.dragableElements; i++) {
      this.dropableObjects.push({
        data: {
          column: i
        },
        zone: this.zonePrefix + i
      })
      this.dragableObjects[i].push({
        data: {
          id: i,
          payload: 'some data',
          name: 'Dragable - ' + i,
          currentColumn: i
        },
        zones: this.generateZones(i)
      })
    }
  }

  private generateZones(zone: number): Array<string> {
    const zones: Array<string> = []
    for (let i = 0; i < this.dragableElements; i++) {
      zones.push(this.zonePrefix + i)
    }

    zones.splice(zone, 1)
    return zones
  }

  public onZoneDrop(event: any) {
    this.dragableObjects[event.zone.column].push({
      data: {
        id: event.data.id,
        payload: event.data.payload,
        name: event.data.name,
        currentColumn: event.zone.column
      },
      zones: this.generateZones(event.zone.column)
    })

    for (
      let i = 0;
      i < this.dragableObjects[event.data.currentColumn].length;
      i++
      ) {
        if (event.data.id === this.dragableObjects[event.data.currentColumn][i].data.id) {
          this.dragableObjects[event.data.currentColumn].splice(i, 1);
        }
    }
  }

/*   ngAfterViewChecked(): void {
      this.gridWidth = this.grid.nativeElement.clientWidth
      this.gridHeight = this.grid.nativeElement.clientHeight
  }

  getTableByPosition(row: number, col: number) {
    const t = this.listOfTables.find(item => item.positionY === col && item.positionX === row)
    if (t !== undefined) {
      return t
    }
    return
  }

  getImageUrl(numberOfPeople: number) {
    return `/assets/images/${this.checkTableSize(numberOfPeople)}`
  }

  checkTableSize(size: number) {
    switch(size) {
      case 2: return 'two-pair-table.jpg'
      case 4: return 'four-pair-table.jpg'
      case 6: return 'six-pair-table.jpg'
      default: return 'two-pair-table.jpg'
    }
  }

  handleDragMoved(event: CdkDragMove<string>, row: number, col: number) {
    console.log(`Element moved from ${event.event}, ${event.source} to ${row}, ${col}`);
    // You can implement your logic here based on the drag movement
  }

  dragEnded(event: CdkDragEnd, row: number, col: number) {
    /* console.log(table)
    console.log(event)
    console.log(row)
    console.log(col)
    /* let tab = this.listOfTables.find(t => t.id === table.id)
    if (tab != undefined) {
      tab.positionX += event.distance.x / 2
      tab.positionY += event.distance.y / 2
    }

    console.log(table)
  } */

/*   selectedRowIndex = 0;
  selectedColIndex = 0;

  @ViewChild('rowList', { static: true }) rowList!: CdkDropList;
  @ViewChild('colList', { static: true }) colList!: CdkDropList;

  drop(event: CdkDragDrop<string[]>, row: number, col: number) {
    moveItemInArray(this.rows, this.selectedRowIndex, row);
    moveItemInArray(this.cols, this.selectedColIndex, col);
    this.selectedRowIndex = row;
    this.selectedColIndex = col;
  }

  move(event: CdkDragMove<string[]>) {
    console.log(event);
    /* this.selectedRowIndex = event.source.data['rowIndex'];
    this.selectedColIndex = event.source.data;
  }

  enter(event: CdkDragEnter) {
    console.log(event);
    //event?.source?.element.classList.add('drag-over');
  }

  leave(event: CdkDragEnd) {
    console.log(event);
    //event.source.element?.classList.remove('drag-over');
  }

  start(event: CdkDragStart, row: number, col: number) {
    console.log(event);
    this.selectedRowIndex = row;
    this.selectedColIndex = col;
  }

  end(event: CdkDragEnd, row: number, col: number) {
    console.log(event);
    let distance = { x: event.source.element.offsetLeft - event.source.parent.element.offsetLeft, y: event.source.element.offsetTop - event.source.parent.element.offsetTop };
    this.drop(event, row, col);
    this.dragEnded(distance, { id: 1, positionX: row, positionY: col });
  }

  dragEnded(event: CdkDragEnd, table: TableFull) {
    console.log(table)
    console.log(event.distance)
    // Your code here
  } */

}
