import { Component, AfterViewChecked, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragEnd, CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableFull } from 'src/app/core/models/table.model';
import Konva from "konva";

interface Boundary {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent implements AfterViewInit {
  private stage!: Konva.Stage;
  private layer!: Konva.Layer;

  constructor(
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    const container = this.elementRef.nativeElement.querySelector('#konvaContainer')
    this.stage = new Konva.Stage({
      container,
      width: 800,
      height: 800,
      visible: true
    })
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)

    const rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 100,
      height: 70,
      draggable: true
    })

    this.layer.add(rect)
    this.layer.draw()
  }




 /*  //@ViewChild("boundary", {static: true}) boundaryElementRef: ElementRef

  boundary: Boundary = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0
  }

  items = [
    { name: 'Item 1', position: { x: 0.0, y: 0.0 } },
    { name: 'Item 2', position: { x: 100, y: 100 } },
    { name: 'Item 3', position: { x: 200, y: 200 } },
  ];

  drop(event: CdkDragDrop<string[]>) {
    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;
    const item = this.items[prevIndex];
    moveItemInArray(this.items, prevIndex, currIndex);
    item.position = { x: event.distance.x, y: event.distance.y };
  }

  tables: TableFull[] = []

  constructor(
    private readonly tableService: TableService,
    private elem: ElementRef
  ) {
    tableService.loadTables().subscribe(
      data => {
        this.tables = data
      }
    )
    //this.boundaryElementRef = elem

  }

  ngAfterViewChecked(): void {
      //this.getBoundarySize()
  }

  getBoundarySize() {
   /*  const targetElement = this.boundaryElementRef.nativeElement
    this.boundary = targetElement.getBoundingClientRect()
    console.log(this.boundary)
  }

  moved(event: any) {
    console.log(event)
  }

  dropped(event: any, item: TableFull) {
    console.log(event)
    console.log(item)
    if ((item.positionX + event.distance.x) < this.boundary.width){
      item.positionX += event.distance.x
      item.positionY += event.distance.y
    }
    console.log(item)
  }

  position(item: TableFull) {
    let style = {}
    if (item.positionX > 0 || item.positionY > 0) {
      style = {
        top: `${item.positionY}px`,
        left: `${item.positionX}px`
      }
    }
    return style
  }
}
 */


}
