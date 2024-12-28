import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, BookOpen } from 'lucide-angular';

@Component({
  selector: 'app-management-navbar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './management-navbar.component.html',
  styleUrl: './management-navbar.component.css',
})
export class ManagementNavbarComponent {
  logo = BookOpen;
}
