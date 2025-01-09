import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarChart2, LucideAngularModule, Pencil } from 'lucide-angular';
import { AuthService } from '../../../../core/Services/auth.service';

@Component({
  selector: 'app-instructor-side-bar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './instructor-side-bar.component.html',
  styleUrl: './instructor-side-bar.component.css',
})
export class InstructorSideBarComponent {
  user: any;
  pencil = Pencil;
  barChart2 = BarChart2;
  constructor(private authService: AuthService) {
    authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
