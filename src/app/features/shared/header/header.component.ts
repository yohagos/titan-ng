import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  openCategory() {
    this.router.navigate(['app/category'])
  }

  logout() {
    this.userService.logout()
  }
}
