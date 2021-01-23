import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any): Observable<any> {
    return this.http.get<T>(`${API_URL}/${url}`, options);
  }

  post<T>(url: string, body?: any, options?: any): Observable<any> {
    return this.http.post<T>(`${API_URL}/${url}`, body, options);
  }

  delete<T>(url: string, options?: any): Observable<any> {
    return this.http.delete<T>(`${API_URL}/${url}`, options);
  }
}
