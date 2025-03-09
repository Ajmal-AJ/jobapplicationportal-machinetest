import { Component, OnInit } from '@angular/core';
import { DateFormatPipe } from '../../../core/pipes/date-format.pipe';
import { Application } from '../../../core/models/applications.models';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {
  applications :Application[] =[];
  isLoading :boolean = false;

  constructor(private applicationService:ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.isLoading =true;
    this.applicationService.getApplications().subscribe({
      next : (data) => {
        this.applications = data;
      this.isLoading =false;

      },
      error: (err) => {
        console.log(err)

      },
    })
  }

}
