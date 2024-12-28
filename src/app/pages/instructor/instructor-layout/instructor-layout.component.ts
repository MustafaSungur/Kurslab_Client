import { Component } from '@angular/core';
import { ManagementNavbarComponent } from '../../../components/shared/header/management-navbar/management-navbar.component';
import { RouterModule } from '@angular/router';
import { InstructorSideBarComponent } from '../../../components/instructor/instructor-side-bar/instructor-side-bar.component';

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
