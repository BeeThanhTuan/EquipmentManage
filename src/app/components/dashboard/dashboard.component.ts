import { Component } from '@angular/core';
import { response } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  name!: string;
  ratio!: number;
  displayedRatio!: number;
  totalEquipment!: number;
  totalEquipmentActive!: number;
  listEquipmentActive: any[]= [];
  listEmployeeBorrowed: any[]= [];

  constructor(
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private employeeService: EmployeeService

  ) {}

  ngOnInit(): void {
    this.getNameUser();
    this.equipmentService.getAllEquipments().subscribe((response) => {
      this.totalEquipment = response.length;
      this.updateRatioAndDisplay(); 
    });
    this.equipmentService.getAllEquipmentBorrowed().subscribe((response) => {
      this.totalEquipmentActive = response.length;
      this.listEquipmentActive = response;
      this.updateRatioAndDisplay();
    });

    this.employeeService.getAllEmployeesBorrowesEquipment().subscribe((response) => {
      this.listEmployeeBorrowed = response;
    });
  }

  updateRatioAndDisplay(): void {
    if (this.totalEquipment > 0) {
      const percent = (this.totalEquipmentActive / this.totalEquipment) * 100;
      this.ratio = Math.round(percent);
    } else {
      this.ratio = 0;
    }

    if (this.totalEquipment > 0 && this.totalEquipmentActive >= 0) {
      this.displayedRatio = 0;
      const targetRatio = this.ratio;
      setTimeout(() => {
        const progressInterval = setInterval(() => {
          if (this.displayedRatio >= targetRatio) {
            clearInterval(progressInterval);
            this.displayedRatio = targetRatio;
          } else {
            this.displayedRatio += 1;
          }
        }, 7);
      }, 100);
    }
  }

  getNameUser() {
    const id = this.authService.getIdFromToken()!;
    this.authService.getInfoUser(id).subscribe((response) => {
      this.name = response.Name;
    });
  }
}
