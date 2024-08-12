import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

   //get all equuipments
   getAllEmployees():Observable<any>{
    const url = `${this.REST_API_SERVER}/api/employees`;
    return this.httpClient.get<any>(url).pipe(
      map((response:any) => response.reverse()) 
    )
  }

  //get employee by id
  getEmployeeByID(id: string):Observable<any>{
    const url = `${this.REST_API_SERVER}/api/employee/${id}`;
    return this.httpClient.get<any>(url);
  }

  //check employee id exists
  checkEmployeeIdExists(id:string){
    const url = `${this.REST_API_SERVER}/api/employee/check/${id}`;
    return this.httpClient.get<boolean>(url);
  }

  //create new equipment
  createNewEmployee(data: FormData): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/employee`;
    return this.httpClient.post<any>(url, data);
  }

  //update employee by id
  updateEmployeeByID(id:string, data: FormData): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/employee/${id}`;
    return this.httpClient.put<any>(url, data);
  }

  //delete equipment by id
  deleteEmployeeByID(id:string): Observable<any>{
    const url = `${this.REST_API_SERVER}/api/employee/${id}`;
    return this.httpClient.delete<any>(url);
  }

  //search eqmployees by search text
  searchEmployees(data: {searchKey: string }):Observable<any>{
    const url = `${this.REST_API_SERVER}/api/employees/search`;
    return this.httpClient.post<any>(url, data, this.httpOptions).pipe(
      map((response:any) => response.reverse()) 
    )
  }
}
