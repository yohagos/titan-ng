import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { TableComponent } from './features/table/table.component';
import { ArrangementComponent } from './features/table/arrangement/arrangement.component';
import { BookingComponent } from './features/table/booking/booking.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { ManageTeamComponent } from './features/manage-team/manage-team.component';
import { ManageBalanceComponent } from './features/manage-balance/manage-balance.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HeaderComponent,
    //canActivate: [AuthGuardService],
    children: [
      {
        path: 'nav',
        component: NavigationComponent,
        //canActivate: [AuthGuardService]
        children: [
          {
            path: 'table',
            component: TableComponent
          },
          {
            path: 'table/:id',
            component: BookingComponent
          }
        ]
      },
      {
        path: 'category',
        component: CategoryComponent,
        //canActivate: [AuthGuardService]
      },
      {
        path: 'product',
        component: ProductComponent
        //canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        //canActivate: [AuthGuardService]
      },
      {
        path: 'manage-team',
        component: ManageTeamComponent,
        //canActivate: [AuthGuardService]
      },
      {
        path: 'manage-balance',
        component: ManageBalanceComponent,
        //canActivate: [AuthGuardService]
      },
      {
        path: 'arrangement',
        component: ArrangementComponent
        //canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/register',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
