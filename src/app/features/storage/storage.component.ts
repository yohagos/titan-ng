import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss'
})
export class StorageComponent {

  constructor(
    private storageService: StorageService
  ) {
    this.storageService.getInventory().subscribe(
      data => {
        console.log(data)
      }
    )
  }

}
