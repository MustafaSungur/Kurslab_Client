import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ManagementNavbarComponent } from '../../../shared/components/header/management-navbar/management-navbar.component';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ManagementNavbarComponent, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
