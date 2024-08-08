import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent {
  equipment: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.equipmentService.getEquipmentByID(id).subscribe((response) => {
      this.equipment = response;
    });
  }

  getNewData(newEquipment: Object){
    this.equipment= newEquipment;
  }
  openEquipmentUpdatePopup() {
    const overlay = document.getElementById('overlayUpdate') as HTMLElement;
    overlay.classList.add('active');
  }
}
