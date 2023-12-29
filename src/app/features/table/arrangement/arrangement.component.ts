import { Component, AfterViewChecked, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragEnd, CdkDropListGroup, CdkDropList, CdkDragMove, CdkDrag } from "@angular/cdk/drag-drop";
import { TableService } from 'src/app/core/services/table.service';
import { TableFull } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrl: './arrangement.component.scss'
})
export class ArrangementComponent {

}
