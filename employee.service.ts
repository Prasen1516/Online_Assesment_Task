import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://dummy.restapiexample.com/api/v1';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee/${id}`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
