import { Component, inject, OnInit } from '@angular/core';
import { ApplicationService } from '../../core/services/application.service';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss',
})
export class MyApplicationsComponent implements OnInit {
  applicationService = inject(ApplicationService);
  appliedJobs: any[] = [];
  emailForm: FormGroup;
  showPopup: boolean = true;
  errorMessage: string = '';
  isLoading: boolean =false

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.emailForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  submitApplication() {
    if (this.emailForm.valid) {
      this.isLoading =true
      this.errorMessage = '';
      const email = this.emailForm.value.email;
      this.applicationService.getUserApplications(email).subscribe({
        next: (response) => {
            this.appliedJobs = response;
            this.showPopup = false;
            this.isLoading =false
        },
        error: (err) => {
          if (err.status === 404 && err.error?.message) {
            this.errorMessage = err.error.message;
          }else if(err.status === 400 && err.error?.error) {
            this.errorMessage = err.error.error;
            this.isLoading =false
          }

          else {
            this.errorMessage = "Something went wrong. Please try again.";
            this.isLoading =false
          }

        },
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
