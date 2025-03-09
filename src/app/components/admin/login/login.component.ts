import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading:boolean = false

  constructor(private fb: FormBuilder, private router: Router, private authService:AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.authService.isAdminAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }


  ngOnInit(): void {

  }


  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading=true;
    const { username, password } = this.loginForm.value;

    if (this.authService.loginAsAdmin(username, password)) {
      this.isLoading=false;
      this.router.navigateByUrl('dashboard');
    } else {
      this.errorMessage = 'Invalid Username or Password!';
      this.isLoading=false;

    }
  }



}
