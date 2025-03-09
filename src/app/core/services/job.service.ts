import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/job.models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = environment.baseUrl;

  constructor(private http:HttpClient, private _snackBar: MatSnackBar,) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/jobs/`, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/jobs/${id}/`, job);
  }

  deleteJob(id:number) {
    return this.http.delete<Job>(`${this.apiUrl}/jobs/${id}/`);
  }

  getJobById(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/${jobId}/`);
  }
  applyForJob(applicationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/`, applicationData);
  }



  public showSnackBar(message: string, action: string, panelClass: string = 'success-snackbar') {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }

}
