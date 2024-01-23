import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { TableComponent } from '../../table/table.component';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showBackToNavigation = false
  showCashier = true

  currentUser!: User | null

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

    this.userService.currentUser.subscribe(
      (data) => {
        this.currentUser = data
        console.log(data)
      }
    )
  }

  openUserProfile() {
    this.router.navigate(['/profile'])
  }

  openManagementTeam() {
    this.router.navigate(['/manage'])
  }

  openCategory() {
    this.router.navigate(['/category'])
  }

  openProduct() {
    this.router.navigate(['/product'])
  }

  openTableArrangement() {
    this.router.navigate(['/arrangement'])
  }

  backToNavigation() {
    this.router.navigate(['nav/table'])
  }

  logout() {
    this.userService.logout()
  }

  checkUserPermission() {
    if (this.currentUser &&
        this.currentUser.role === 'ADMIN' ||
        this.currentUser?.role === 'MANAGER') {
      return true
    }
    return false
  }
}
