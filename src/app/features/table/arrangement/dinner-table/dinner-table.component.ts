import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableFull } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-dinner-table',
  templateUrl: './dinner-table.component.html',
  styleUrl: './dinner-table.component.scss'
})
export class DinnerTableComponent {
  @Input() table!: TableFull;
  @Output() tableClicked = new EventEmitter<TableFull>();
  @Output() tableDeleted = new EventEmitter<TableFull>();

  constructor() {}

}
