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
  
  //get all equuipments
  getAllEquipments():Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipments`;
    return this.httpClient.get<any>(url).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  //get all equuipments instrock (status = false)
  getAllEquipmentInstock():Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipments/instock`;
    return this.httpClient.get<any>(url).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  //get all equuipments borrowed (status = true)
  getAllEquipmentBorrowed():Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipments/borrowed`;
    return this.httpClient.get<any>(url).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  //search equuipments by search text
  searchEquipments(data: {status: string; searchText: string }):Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipments/search`;
    return this.httpClient.post<any>(url, data, this.httpOptions).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  //get equuipment by id
  getEquipmentByID(id: string):Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment/${id}`;
    return this.httpClient.get<any>(url);
  }

  //check equipment exists by id
  checkEquipmentIdExists(id: string): Observable<boolean> {
    const url = `${this.REST_API_SERVER}/api/equipment/check/${id}`;
    return this.httpClient.get<boolean>(url);
  }
  
   //create new equipment
  createNewEquipment(data: FormData): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment`;
    return this.httpClient.post<any>(url, data);
  }

 //update equipment by id
  updateEquipmentByID(id:string, data: FormData): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment/${id}`;
    return this.httpClient.put<any>(url, data);
  }

 //delete equipment by id
  deleteEquipmentByID(id:string): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/equipment/${id}`;
    return this.httpClient.delete<any>(url);
  }
  
}
