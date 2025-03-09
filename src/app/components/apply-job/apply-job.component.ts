import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../core/services/job.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.scss'
})
export class ApplyJobComponent implements OnInit{
  applyForm: FormGroup;
  @Input() jobId: string | null = null;
  isLoading :boolean =false;

  constructor(private fb: FormBuilder, private jobService:JobService ) {
    this.applyForm = this.fb.group({
      applicantName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  submitApplication() {
    if (this.applyForm.valid && this.jobId !== null) {
      this.isLoading = true;
      const applicationData = {
        job: this.jobId,
        applicant_name: this.applyForm.value.applicantName,
        email: this.applyForm.value.email,
      };
      this.jobService.applyForJob(applicationData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.jobService.showSnackBar('Application submitted successfully!', 'Close');
          this.applyForm.reset();
        },
        error: (err) => {
          this.isLoading = false;

          if (err.status === 400) {
            this.jobService.showSnackBar(err.error.email, 'Close', 'error-snackbar');
            this.applyForm.reset();
            return;
          }

          this.jobService.showSnackBar('An error occurred while submitting your application.', 'Close', 'error-snackbar');
        },
      });
    }
  }

}
