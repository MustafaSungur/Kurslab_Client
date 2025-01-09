import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ManagementNavbarComponent } from '../../../shared/components/header/management-navbar/management-navbar.component';
import { InstructorSideBarComponent } from '../../components/instructor-side-bar/instructor-side-bar.component';

@Component({
  selector: 'app-instructor-layout',
  standalone: true,
  imports: [
    ManagementNavbarComponent,
    RouterModule,
    InstructorSideBarComponent,
  ],
  templateUrl: './instructor-layout.component.html',
  styleUrl: './instructor-layout.component.css',
})
export class InstructorLayoutComponent {}
