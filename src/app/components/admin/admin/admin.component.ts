import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.models';
import { ConfirmationDailogComponent } from '../../confirmation-dailog/confirmation-dailog.component';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatSnackBarModule, JobFormComponent, ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent  implements OnInit {
  jobList :Job[] =[];
  selectedJob: Job | null = null;
  isLoading :boolean = false;

  constructor(public dialog: MatDialog, private jobService:JobService  ){}

  ngOnInit(): void {
   this.loadjobs();
  }


  loadjobs() {
    this.isLoading =true;
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobList =data
        this.isLoading =false;
      },
      error:(err) => {
        this.isLoading =false;
        console.log(err)
      },

    })
  }

  addOrUpdateJob(job: Job) {
    this.loadjobs();
    this.selectedJob = null;
  }

  editJob(job: Job) {
    this.selectedJob = { ...job };
  }

  deleteJob(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDailogComponent, {
      width: '350px',
      minWidth: '300px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this Row?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.jobService.deleteJob(id).subscribe({
          next: (value) => {
            this.loadjobs();
            this.jobService.showSnackBar('Job deletion successfully!', 'Close');
          },
          error:(err) => {
            this.jobService.showSnackBar('Failed to delete job. Try again!', 'Close','error-snackbar');

          },
        })
      }
    });
  }

}
