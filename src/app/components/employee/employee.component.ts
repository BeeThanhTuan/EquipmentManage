import { Component } from '@angular/core';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

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

  constructor(private employeeService: EmployeeService, private toastService:ToastrService){}

  ngOnInit(): void {
    this.getAllEmployees();
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
}
