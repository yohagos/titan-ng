import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showBackToNavigation = false
  showCashier = true

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    router.events.subscribe(
      (val) => {
        if (val instanceof NavigationEnd) {
          let url = val.url
          if (!url.includes('/nav')) {
            this.showCashier = false
            this.showBackToNavigation = true
          } else {
            this.showCashier = true
            this.showBackToNavigation = false
          }
        }
      }
    )
  }

  openCategory() {
    this.router.navigate(['/category'])
  }

  openProduct() {
    this.router.navigate(['/product'])
  }

  backToNavigation() {
    this.router.navigate(['nav/table'])
  }

  logout() {
    this.userService.logout()
  }
}
