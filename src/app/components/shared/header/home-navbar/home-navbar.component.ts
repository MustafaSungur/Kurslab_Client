import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookOpen, LogOut, LucideAngularModule } from 'lucide-angular';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    SidebarModule,
    LucideAngularModule,
    ButtonModule,
  ],

  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css',
})
export class HomeNavbarComponent {
  readonly logo = BookOpen;
  readonly logoutIcon = LogOut;
  isOpen = false;
  userToken: any = null;

  constructor(private router: Router, private authService: AuthService) {
    this.userToken = localStorage.getItem('token');
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.resetToken();
    this.router.navigate(['/auth/login']);
  }
}
