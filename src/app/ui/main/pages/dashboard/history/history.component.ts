import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgFor } from '@angular/common';
import { MainCourseCardComponent } from '../../../../shared/components/main-course-card/main-course-card.component';
import { ContentUserService } from '../../../../../core/Services/models/content-user.service';

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
