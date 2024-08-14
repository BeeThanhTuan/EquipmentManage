import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as e from 'express';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { showToastSuccess } from 'src/app/toast-message/toastr';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent {

  equipment: any;
  listEmployee:any[] =[];
  query = new FormControl();
  idEmployee!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private employeeService: EmployeeService,
    private toastrSerice: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.equipmentService.getEquipmentByID(id).subscribe((response) => {
      this.equipment = response;
    });

    this.employeeService.getAllEmployees().subscribe(
      (response)=>{
        this.listEmployee = response
      }
    );

    this.query.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.searchIDEmployee();
    });
  }



  getNewData(newEquipment: Object){
    this.equipment= newEquipment;
  }

  getIDEmployee(event: Event) {
    const elm = event.target as HTMLElement;
    const elmChild = elm.firstChild as HTMLElement;
    const id = elmChild.getAttribute('id')!;
    this.idEmployee = id;
    this.removeSearchIDEmployee();
    this.togglePopupConfirm();
  }

  searchIDEmployee() {
    const query = this.query.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const items: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul.list-employee li');
    items.forEach((item) => {
      const text = item.textContent!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  hanldBorrowedEquipment() {
    this.equipmentService.borrowEquipment({equipmentID: this.equipment.ID, employeeID: this.idEmployee}).subscribe(
      (response)=>{
        this.equipment = response.data;
        showToastSuccess(this.toastrSerice,'Successful borrowed.');
        this.togglePopupConfirm();

      }
    )
  }

  hanldReturnEquipment() {
    console.log(this.equipment.ID, this.equipment.IDEmployee);
    this.equipmentService.returnEquipment({equipmentID: this.equipment.ID, employeeID: this.equipment.IDEmployee}).subscribe(
      (response)=>{
        this.equipment = response.data;
        showToastSuccess(this.toastrSerice,'Successful return.');
        this.togglePopupConfirm();
      }
    )
  }

  openSearchIDEmployee() {
    const selectBox = document.getElementById('searchBoxEmployee') as HTMLElement;
    selectBox.classList.add('active');
  }

  removeSearchIDEmployee() {
    const selectBox = document.getElementById(
      'searchBoxEmployee'
    ) as HTMLElement;
    if (selectBox.classList.contains('active')) {
      selectBox.classList.remove('active');
    }
  }

  removeSearchIDEmployeeOverLay(event: Event) {
    const selectBox = document.getElementById('searchBoxEmployee') as HTMLElement;
    const target = event.target as Node;
    if (!selectBox.contains(target)) {
      if (selectBox.classList.contains('active')) {
        selectBox.classList.remove('active');
      }
    }
  }

  openEquipmentUpdatePopup() {
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }

  //toggle popup confirm
  togglePopupConfirm(){
    const overlay = document.getElementById('popupConfirm') as HTMLElement;
    overlay.classList.toggle('active');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
