import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  openEmployeeAddPopup(){
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    overlay.classList.add('active');
  }

  openEmployeeUpdatePopup(){
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }
}
