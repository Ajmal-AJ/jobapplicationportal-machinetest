import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../models/applications.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.baseUrl;

  constructor(private http :HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>( `${this.apiUrl}/applications/`);
  }

  getUserApplications(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-applications/?email=${email}`);
  }

}
