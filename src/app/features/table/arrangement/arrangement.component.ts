import { Component, AfterViewChecked, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragEnd, CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableFull } from 'src/app/core/models/table.model';



@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent implements AfterViewInit {
  @ViewChild('tableContainer', {static: false}) tableContainer!: ElementRef
  @ViewChild('myCanvas', {static: false}) canvas!: ElementRef
  @ViewChild('svgContainer') svgContainer!: ElementRef
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


  constructor(
    private tableService: TableService
  ) {
    tableService.loadTables().subscribe(
      data => { }
    )
  }

  ngAfterViewInit(): void {
    this.configureTableContainer()
  }

  configureTableContainer() {
    this.tableContainer.nativeElement.style.width = '900px'
    this.tableContainer.nativeElement.style.height = '500px'
    this.tableContainer.nativeElement.style.border = '2px solid #ccc'
    //this.createTables()
    //this.createRectangles()
  }

  createTables() {
    this.svgContainer.nativeElement.style.width = '850px'
    this.svgContainer.nativeElement.style.height = '470px'
    this.svgContainer.nativeElement.style.border = '3px solid #ccc'
    this.svgContainer.nativeElement.setAttribute('viewBox', '0 0 700 400');

    this.tables.forEach((table) => {
      const svgNS = 'http://www.w3.org/2000/svg'
      const svgTable = document.createElementNS(svgNS, 'svg-rect')
      svgTable.setAttribute('id', `table-${table.tableNumber}`)
      svgTable.setAttribute('x', `${table.positionX}`)
      svgTable.setAttribute('y', `${table.positionY}`)
      svgTable.setAttribute('width', '30')
      svgTable.setAttribute('height', '20')
      svgTable.setAttribute('fill', 'blue')
      svgTable.setAttribute('stroke', 'black')
      svgTable.setAttribute('stroke-width', '2')
      console.log(svgTable)
      this.svgContainer.nativeElement.appendChild(svgTable)
      console.log(this.tableContainer)
    })
  }

  createRectangles() {
    this.tables.forEach(table => {
      const rect = document.createElement('canvas')
      rect.setAttribute('width', '100')
      rect.setAttribute('height', '50')
      rect.setAttribute('x', `${table.positionX}`)
      rect.setAttribute('y', `${table.positionY}`)
      rect.setAttribute('border', '2px solid #f32177')
      rect.setAttribute('background-color', '#f7f7f7')
      rect.setAttribute('border-radius', '20%')
      this.tableContainer.nativeElement.appendChild(rect)
    })
  }

}
