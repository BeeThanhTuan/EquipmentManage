import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { ManageComponent } from './components/manage/manage.component';
import { authGuard } from './guard/auth.guard';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'manage', component: ManageComponent, canActivate:[authGuard], children:[
    {path: '', redirectTo: 'dashboard', pathMatch:'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'equipment', component: EquipmentComponent},
    {path: 'equipment/id', component: EquipmentDetailComponent},
    {path: 'employee', component: EmployeeComponent},
    {path: 'employee/id', component: EmployeeDetailComponent},
    {path: '**', redirectTo: 'dashboard'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
