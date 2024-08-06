import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ProfilerComponent } from './components/profiler/profiler.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { UpdateEmployeeComponent } from './components/employee-update/update-employee.component';
import { PhoneNumberPipe } from './custom-pipe/phone-number.pipe';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EquipmentAddComponent } from './components/equipment-add/equipment-add.component';
import { EquipmentUpdateComponent } from './components/equipment-update/equipment-update.component';
import { ManageComponent } from './components/manage/manage.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmployeeComponent,
    EquipmentComponent,
    ProfilerComponent,
    EquipmentDetailComponent,
    EmployeeDetailComponent,
    UpdateEmployeeComponent,
    PhoneNumberPipe,
    EmployeeAddComponent,
    EquipmentAddComponent,
    EquipmentUpdateComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
