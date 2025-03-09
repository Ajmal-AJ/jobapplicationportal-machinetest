import { JobService } from './../../core/services/job.service';
import { ApplyJobComponent } from './../apply-job/apply-job.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [ApplyJobComponent,RouterModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss'
})
export class JobDetailComponent  implements OnInit {
  constructor(private route: ActivatedRoute) {}
  jobId: number | null = null;
  jobService = inject(JobService)
  job: any = {};
  applicantId: number = 0;
  disableApplyButton: boolean = false;


  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.jobId) {
      this.getJobDetails();
    }
    this.route.queryParams.subscribe(params => {
      this.applicantId = +params['applicantId'];
      this.disableApplyButton = this.applicantId > 0;
    });
  }

  getJobDetails() {
    this.jobService.getJobById(this.jobId!).subscribe({
      next: (response) => {
        this.job = response;
      },
      error: (err) => {
        console.error('Error fetching job details:', err);
      },
    });
  }


}
