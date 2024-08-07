import { Component } from '@angular/core';
import { response } from 'express';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  listEquipment :any[] = [];
  constructor(private equipmentService: EquipmentService){}

  ngOnInit(): void {
   this.getAllEquipment()
  }

  getAllEquipment(){
    this.equipmentService.getAllEquipments().subscribe(
      (response)=>{
        this.listEquipment = response;
      }
    )
  }

  openEquipmentAddPopup(){
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    overlay.classList.add('active');
  }

  openEquipmentUpdatePopup(){
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }
}
