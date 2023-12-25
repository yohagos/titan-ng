import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { HeaderComponent } from './features/shared/header/header.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NavigationComponent } from './features/shared/navigation/navigation.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { TableComponent } from './features/table/table.component';

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
