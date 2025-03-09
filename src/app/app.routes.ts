import { Routes } from '@angular/router';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';
import { adminauthGuard } from './core/guards/adminauth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ApplicationsComponent } from './components/admin/applications/applications.component';

export const routes: Routes = [

  {
    path:'',component:LayoutComponent,children:[
      { path:'',component:JobListComponent,title:"Job Application Portal"},
      { path: 'job-detail/:id',component:JobDetailComponent,title:"Job Application Portal"},
      { path: 'my-applications',component:MyApplicationsComponent,title:"Job Application Portal" },
    ]
  },

  {path:'admin', component:LoginComponent, title:'Admin Login'},
  { path: 'dashboard', component: AdminLayoutComponent, canActivate: [adminauthGuard],
    children: [
      { path: '', component: AdminComponent, title: 'Admin Portal' },
      { path: 'applications', component: ApplicationsComponent, title: 'Applications' },
    ]
  }

];
