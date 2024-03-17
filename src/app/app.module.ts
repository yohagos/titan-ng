import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from "ngx-color-picker";

// Components
import { AppComponent } from './app.component';
import { PinDialogComponent } from "./features/authentication/pin-dialog/pin-dialog.component";
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HeaderComponent } from "./shared/header/header.component";
import { NavigationComponent } from "./shared/navigation/navigation.component";
import { CashierComponent } from "./shared/cashier/cashier.component";
import { CashDialogComponent } from "./shared/cashier/cash-dialog/cash-dialog.component";
import { CardDialogComponent } from "./shared/cashier/card-dialog/card-dialog.component";

import { UserProfileComponent } from "./shared/user-profile/user-profile.component";
import { ChangePinDialogComponent } from './shared/user-profile/change-pin-dialog/change-pin-dialog.component';
import { ManageTeamComponent } from "./features/manage-team/manage-team.component";
import { AddUserDialogComponent } from "./features/manage-team/add-user-dialog/add-user-dialog.component";
import { EditUserDialogComponent } from "./features/manage-team/edit-user-dialog/edit-user-dialog.component";
import { ManageBalanceComponent } from './features/manage-balance/manage-balance.component';

import { CategoryComponent } from './features/category/category.component';
import { AddDialogComponent } from './features/category/add-dialog/add-dialog.component';
import { EditDialogComponent } from './features/category/edit-dialog/edit-dialog.component';

import { ProductComponent } from './features/product/product.component';
import { AddProductDialogComponent } from './features/product/add-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './features/product/edit-dialog/edit-product-dialog.component';

import { TableComponent } from './features/table/table.component';
import { BookingComponent } from './features/table/booking/booking.component';
import { TogoComponent } from './features/table/togo/togo.component';
import { ArrangementComponent } from './features/table/arrangement/arrangement.component';
import { AddTableDialogComponent } from "./features/table/arrangement/add-table-dialog/add-table-dialog.component";

import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";

import { StorageComponent } from "./features/storage/storage.component";
import { AddInventoryDialogComponent } from "./features/storage/add-inventory-dialog/add-inventory-dialog.component";
import { EditInventoryDialogComponent } from './features/storage/edit-inventory-dialog/edit-inventory-dialog.component';

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

// Directives
import { InputRecognitionDirective } from "./core/directive/input-recognition.directive";
import { DecimalFormatterDirective } from './core/directive/decimal-formatter.directive';
import { DinnerTableComponent } from './features/table/arrangement/dinner-table/dinner-table.component';



@NgModule({
  declarations: [
    AppComponent,
    PinDialogComponent,
    LoginComponent,
    RegisterComponent,

    UserProfileComponent,
    ChangePinDialogComponent,
    ManageTeamComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ManageBalanceComponent,

    CategoryComponent,
    AddDialogComponent,
    ConfirmDialogComponent,
    EditDialogComponent,

    ProductComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,

    TableComponent,
    TogoComponent,
    BookingComponent,
    ArrangementComponent,
    DinnerTableComponent,
    AddTableDialogComponent,

    HeaderComponent,
    NavigationComponent,
    CashierComponent,
    CashDialogComponent,
    CardDialogComponent,

    StorageComponent,
    AddInventoryDialogComponent,
    EditInventoryDialogComponent,

    TextFilterPipe,
    EnumToArrayPipe,

    InputRecognitionDirective,
    DecimalFormatterDirective
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
    DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
