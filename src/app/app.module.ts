import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from "ngx-color-picker";

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HeaderComponent } from "./features/shared/header/header.component";
import { NavigationComponent } from "./features/shared/navigation/navigation.component";
import { CashierComponent } from "./features/shared/cashier/cashier.component";
import { CategoryComponent } from './features/category/category.component';

import { ProductComponent } from './features/product/product.component';
import { AddProductDialogComponent } from './features/product/add-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './features/product/edit-dialog/edit-product-dialog.component';

import { TableComponent } from './features/table/table.component';
import { BookingComponent } from './features/table/booking/booking.component';
import { ArrangementComponent } from './features/table/arrangement/arrangement.component';
import { AddTableDialogComponent } from "./features/table/arrangement/add-table-dialog/add-table-dialog.component";

import { AddDialogComponent } from './features/category/add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from "./features/shared/confirm-dialog/confirm-dialog.component";
import { EditDialogComponent } from './features/category/edit-dialog/edit-dialog.component';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from './materials.module';

// Interceptor
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

// Pipes
import { TextFilterPipe } from './core/pipe/textfilter.pipe';
import { EnumToArrayPipe } from "./core/pipe/enumToArray.pipe";
import { DropableDirective } from './core/directive/dropable.directive';
import { DragableDirective } from './core/directive/dragable.directive';
import { DragService } from './core/services/drag.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    CategoryComponent,
    AddDialogComponent,
    ConfirmDialogComponent,
    EditDialogComponent,

    ProductComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,

    TableComponent,
    BookingComponent,
    ArrangementComponent,
    AddTableDialogComponent,

    HeaderComponent,
    NavigationComponent,
    CashierComponent,

    TextFilterPipe,
    EnumToArrayPipe,

    DragableDirective,
    DropableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    DragDropModule,
  ],
  providers: [
    DragService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
