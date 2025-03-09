import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.models';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss'
})
export class JobFormComponent  implements OnChanges {
  jobForm: FormGroup;
  isLoading :boolean = false;

  @Input() selectedJob: any = null;
  @Output() jobSaved = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private jobService: JobService,) {

    this.jobForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedJob'] && this.selectedJob) {
      this.jobForm.patchValue(this.selectedJob);
    } else {
      this.jobForm.reset();
    }
  }

  saveJob() {
    if (this.jobForm.valid) {
      this.isLoading = true;
      const jobData: Job = this.jobForm.value;

      if (jobData.id) {

        this.jobService.updateJob(jobData.id, jobData).subscribe({
          next: (updatedJob) => {
            this.jobSaved.emit(updatedJob);
            this.jobService.showSnackBar('Job updated successfully!', 'Close');
            this.isLoading = false;
            this.jobForm.reset();
          },
          error: () => {
            this.jobService.showSnackBar('Failed to update job!', 'Close', 'error-snackbar');
            this.isLoading = false;
          },
        });
      } else {
        this.jobService.createJob(jobData).subscribe({
          next: (newJob) => {
            this.jobSaved.emit(newJob);
            this.jobService.showSnackBar('Job added successfully!', 'Close');
            this.jobForm.reset();
            this.isLoading = false;
          },
          error: () => {
            this.jobService.showSnackBar('Failed to add job!', 'Close', 'error-snackbar');
            this.isLoading = false;
          },
        });
      }
    }
  }
  closeform() {
    this.jobForm.reset();
  }

}
