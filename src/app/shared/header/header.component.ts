import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showBackToNavigation = false
  showCashier = true

  currentUser!: User | null

  themes = [
    {
      name: 'dark',
      icon: 'brightness_3'
    },
    {
      name: 'light',
      icon: 'wb_sunny'
    }
  ]

  constructor(
    private userService: UserService,
    private router: Router,
    private themeService: ThemeService
  ) {
    router.events.subscribe(
      (val) => {
        if (val instanceof NavigationEnd) {
          let url = val.url
          if (!url.includes('/nav/table')) {
            this.showCashier = false
            this.showBackToNavigation = true
          } else {
            this.showCashier = true
            this.showBackToNavigation = false
          }
          if (url.includes('/togo')) {
            this.showCashier = true
          }
        }
      }
    )

    this.userService.currentUser.subscribe(
      (data) => {
        this.currentUser = data
      }
    )
  }

  ngOnInit() {
  }

  setTheme() {
    let currentTheme = this.themeService.currentActive()
    this.themeService.update(currentTheme === 'dark' ? 'light' : 'dark')
  }

  openUserProfile() {
    this.router.navigate(['/profile'])
  }

  openManagementTeam() {
    this.router.navigate(['/manage-team'])
  }

  openManagementBalance() {
    this.router.navigate(['/manage-balance'])
  }

  openStorage() {
    this.router.navigate(['/storage'])
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

  openSettings() {
    this.router.navigate(['/settings'])
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
