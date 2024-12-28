import { Component } from '@angular/core';
import { CourseListComponent } from '../../../../components/courses/course-list/course-list.component';
import { ContentUserService } from '../../../../Services/models/content-user.service';
import { ActivatedRoute } from '@angular/router';
import { MainCourseCardComponent } from '../../../../components/shared/main-course-card/main-course-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, MainCourseCardComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  userID: string;
  items: any;
  errorCourse: string;

  constructor(
    private contentUserService: ContentUserService,
    private activetedRoute: ActivatedRoute
  ) {
    this.activetedRoute.paramMap.subscribe((params) => {
      this.userID = params.get('userID');
      contentUserService.getHistory(this.userID).subscribe({
        next: (response) => {
          this.items = [...response.$values];
          console.log(response);
        },
        error: (err) => {
          this.errorCourse = err.message;
          console.log(err);
        },
      });
    });
  }
}
