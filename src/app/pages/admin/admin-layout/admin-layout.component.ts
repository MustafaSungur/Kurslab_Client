import { Component } from '@angular/core';
import { ManagementNavbarComponent } from '../../../components/shared/header/management-navbar/management-navbar.component';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../../../components/admin/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ManagementNavbarComponent, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
