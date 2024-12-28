import { Component, Input } from '@angular/core';
import { MainCourseCardComponent } from '../../shared/main-course-card/main-course-card.component';
import { BookOpen, LucideAngularModule } from 'lucide-angular';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MainCourseCardComponent, NgFor, NgIf, LucideAngularModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  readonly logo = BookOpen;
  @Input() courses: any;
}
