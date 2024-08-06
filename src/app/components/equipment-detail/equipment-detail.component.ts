import { Component } from '@angular/core';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent {
  openEquipmentUpdatePopup(){
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }
}
