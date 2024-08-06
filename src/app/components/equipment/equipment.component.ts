import { Component } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  openEquipmentAddPopup(){
    const overlay = document.getElementById('overlayAdd') as HTMLElement;
    overlay.classList.add('active');
  }

  openEquipmentUpdatePopup(){
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }
}
