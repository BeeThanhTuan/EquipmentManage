import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EquipmentService } from 'src/app/services/equipment.service';
import { showToastSuccess } from 'src/app/toast-message/toastr';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  listEquipment :any[] = [];
  equipment: any;
  index!: number;
  id!: string;
  searchText = new FormControl();
  status: string = '';

  constructor(private equipmentService: EquipmentService, private toastService:ToastrService){}

  ngOnInit(): void {
    this.getAllEquipments();

    this.searchText.valueChanges.pipe(
      debounceTime(1500) // Thay đổi thời gian debounce ở đây (3000ms = 3s)
    ).subscribe(value => {
      this.searchEquipments();
    });
    
  }

  //get all equipments form database
  getAllEquipments(){
    this.equipmentService.getAllEquipments().subscribe(
      (response)=>{
        this.listEquipment = response;
      }
    )
  }

  //get all equipments instock form database
  getAllEquipmentsInstock(){
    this.equipmentService.getAllEquipmentInstock().subscribe(
      (response)=>{
        this.listEquipment = response;
      }
    )
  }

  //get all equipments borrowed form database
  getAllEquipmentsBorrowed(){
    this.equipmentService.getAllEquipmentBorrowed().subscribe(
      (response)=>{
        this.listEquipment = response;
      }
    )
  }

  //search equipments 
  searchEquipments(){
    this.equipmentService.searchEquipments({status: this.status, searchText: this.searchText.value}).subscribe(
      (response)=>{
        this.listEquipment = response;
      }
    )
  }
  
  //get index equipment
  getIndex(i: number){
    this.index = i;
  }

  //get id equipment
  getID(id: string){
    this.id = id;
  }

  //get status 
  getDataStatus(event:Event){
    const dataStatus = event.target as HTMLElement;
    this.status = dataStatus.getAttribute('data-status')!;
  }

  //update equipment to list equiments
  getAndReplaceNewEquipment(newEquipment: Object){
    this.listEquipment[this.index] = newEquipment;
  }

  //add new equipment to list equiments
  getEquipmentFormChild(equipment: Object){
    this.listEquipment.unshift(equipment);
  }

  //delete equipment
  deleteEquimentByID(){
    this.equipmentService.deleteEquipmentByID(this.id).subscribe(
      ()=>{
        this.togglePopupDelete();
        this.listEquipment.splice(this.index,1);
        showToastSuccess(this.toastService, 'Deleted equipment success!');
      }
    )
  }

  //open popup add equipment
  openEquipmentAddPopup(){
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    overlay.classList.add('active');
  }

  //open popup update equipment
  openEquipmentUpdatePopup(equipment: Object){
    this.equipment = equipment
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }

  //popup delete
  togglePopupDelete(){
    const overlay = document.getElementById('popupDelete') as HTMLElement;
    overlay.classList.toggle('active');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
