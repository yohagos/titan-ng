import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableFull } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  table!: TableFull

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(
      (params) => {
        this.table = params as TableFull
      }
    )
  }

}
