import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {

  openEmployeePopup(){
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }

}
