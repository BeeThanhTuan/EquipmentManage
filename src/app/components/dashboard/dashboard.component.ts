import { Component } from '@angular/core';
import { response } from 'express';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  name!:string;
  ratio!: number;
  displayedRatio!: number;
  totalEquipment!:number;
  totalEquipmentActive!:number;

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.getNameUser();
    this.totalEquipment = 20;
    this.totalEquipmentActive = 10;
    let precent = (this.totalEquipmentActive/this.totalEquipment) * 100;
    this.ratio =  Math.round(precent);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.displayedRatio = 0;
      const targetRatio = this.ratio;
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

  getNameUser(){
   const id = this.authService.getIdFromToken()!;
   this.authService.getInfoUser(id).subscribe((response)=>{
    this.name =  response.Name;
   })
  }
}
