import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  UserRoundPen,
  BringToFront,
  BarChart2,
} from 'lucide-angular';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  bringToFront = BringToFront;
  userRoundPen = UserRoundPen;
  barChart2 = BarChart2;
}
