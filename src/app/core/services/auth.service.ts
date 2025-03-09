import { inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  public adminCredentials = { username: 'admin', password: 'admin123' };
  constructor(private router :Router) { }

  loginAsAdmin(username: string, password: string): boolean {
    if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('admin', 'true');
      }
      return true;
    }
    return false;
  }


  isAdminAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('admin') === 'true';
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('admin');
      this.router.navigate(['/admin'])

    }
  }
  
}
