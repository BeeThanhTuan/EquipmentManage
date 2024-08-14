import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { showToastSuccess } from 'src/app/toast-message/toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  listEmployee: any[] = [];
  employee!: object;
  index!: number;
  id!: string;
  searchKey = new FormControl
  constructor(private employeeService: EmployeeService, private toastService:ToastrService){}

  ngOnInit(): void {
    this.getAllEmployees();

    this.searchKey.valueChanges.pipe(debounceTime(700)).subscribe(() => {
      this.searchEmployees();
    });
  }

  //get all employee from database
  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe(
    (response)=>{
      this.listEmployee = response;
    })
  }

  //get index equipment
  getIndex(i: number){
    this.index = i;
  }

  //get id equipment
  getID(id: string){
    this.id = id;
  }

  //add new employee to list mployees
  getEmployeeFormChild(employee: Object){
    this.listEmployee.unshift(employee);
  }

  //update employee to list employees
  getAndReplaceNewEmployee(newEmployee: Object){
    console.log(newEmployee);
    this.listEmployee[this.index] = newEmployee;
  }

  //delete employee
  deleteEmployeeByID(){
    this.employeeService.deleteEmployeeByID(this.id).subscribe(
      ()=>{
        this.togglePopupConfirm();
        this.listEmployee.splice(this.index, 1);
        showToastSuccess(this.toastService, 'Deleted employee success!');
      }
    )
  }

  //search equipments 
  searchEmployees(){
    this.employeeService.searchEmployees({searchKey: this.searchKey.value}).subscribe(
      (response)=>{
        this.listEmployee = response;
      }
    )
  }

  //open popup add new employee
  openEmployeeAddPopup(){
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    overlay.classList.add('active');
  }

  //open popup update employee
  openEmployeeUpdatePopup(employee: Object){
    this.employee = employee;
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }

  //popup delete
  togglePopupConfirm(){
    const overlay = document.getElementById('popupConfirm') as HTMLElement;
    overlay.classList.toggle('active');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
