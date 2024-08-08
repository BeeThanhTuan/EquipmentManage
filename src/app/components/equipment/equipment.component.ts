import { Component } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  listEquipment :any[] = [];
  equipment: any;
  index!: number;

  constructor(private equipmentService: EquipmentService){}

  ngOnInit(): void {
   this.getAllEquipment()
  }

  getIndex(i: number){
    this.index = i;
  }

  getAndReplaceNewEquipment(newEquipment: Object){
    this.listEquipment[this.index] = newEquipment;
  }

  getAllEquipment(){
    this.equipmentService.getAllEquipments().subscribe(
      (response)=>{
        this.listEquipment = response;
      }
    )
  }

  getEquipmentFormChild(equipment: Object){
    this.listEquipment.unshift(equipment);
  }

  openEquipmentAddPopup(){
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    overlay.classList.add('active');
  }

  openEquipmentUpdatePopup(equipment: Object){
    this.equipment = equipment
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }
}
