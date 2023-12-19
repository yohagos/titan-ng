import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { HeaderComponent } from './features/shared/header/header.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NavigationComponent } from './features/shared/navigation/navigation.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: NavigationComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
