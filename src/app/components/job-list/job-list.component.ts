import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { Job } from './../../core/models/job.models';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {

  jobList: Job[] = [];
  isLoading :boolean =false;

  constructor(private jobService: JobService) { }
  ngOnInit() {
    this.loadJobs();
  }


  loadJobs() {
    this.isLoading=true;
    this.jobService.getJobs().subscribe({
      next: (response) => {

        this.jobList = response;
        this.isLoading =false;

      },
      error: (err) => {
        console.error("Error fetching jobs:", err);
        this.isLoading =false;
      },
      complete: () => {
        console.log("Job fetching completed.");
        this.isLoading =false;
      },
    });
  }


}
