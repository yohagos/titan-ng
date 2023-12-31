import { Component, AfterViewChecked, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragEnd, CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableFull } from 'src/app/core/models/table.model';



@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent {
  private imageSize = 13.5

  tables = [
    {
        id: 4,
        tableNumber: 210,
        openCosts: 0,
        numberOfPeople: 6,
        occupied: true,
        occupiedFrom: null,
        occupiedTill: null,
        positionX: 50,
        positionY: 110,
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
      positionX: 200,
      positionY: 110,
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
        positionX: 100,
        positionY: 150,
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
  ]

  listOfTables: TableFull[] = []

  constructor(
    private tableService: TableService
  ) {
    this.tableService.loadTables().subscribe(
      data => {
        this.listOfTables = data
       }
    )
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

  tableConfiguration(table: TableFull) {
    console.log('table : ', table.id)
  }

  dragEnded(event: CdkDragEnd, table: TableFull) {
    console.log(table)
    console.log(event.distance)
    let tab = this.listOfTables.find(t => t.id === table.id)
    if (tab != undefined) {
      tab.positionX += event.distance.x / 2
      tab.positionY += event.distance.y / 2
    }

    console.log(table)
  }

}
