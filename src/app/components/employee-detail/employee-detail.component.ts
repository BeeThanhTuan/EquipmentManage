import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee:any;
  listEquipmentBorrowed :any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployeeByID(id).subscribe((response) => {
      this.employee = response.data;  
      this.listEquipmentBorrowed = response.data.BorrowedEquipmentList;
    });
  }

  getDataFormChild(employee: Object){
    this.employee = employee;
  }
  
  openEmployeePopup(){
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }

}
