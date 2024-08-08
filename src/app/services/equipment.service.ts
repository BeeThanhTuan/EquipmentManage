import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  
  getAllEquipments():Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipments`;
    return this.httpClient.get<any>(url).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  getAllEquipmentBorrowed():Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipments/borrowed`;
    return this.httpClient.get<any>(url).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  getEquipmentByID(id: string):Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment/${id}`;
    return this.httpClient.get<any>(url);
  }

  checkEquipmentIdExists(id: string): Observable<boolean> {
    const url = `${this.REST_API_SERVER}/api/equipment/check/${id}`;
    return this.httpClient.get<boolean>(url);
  }
  
  createNewEquipment(data: FormData): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment`;
    return this.httpClient.post<any>(url, data);
  }

  updateEquipmentByID(id:string, data: FormData): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment/${id}`;
    return this.httpClient.put<any>(url, data);
  }
}
