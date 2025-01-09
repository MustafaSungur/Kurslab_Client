import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { CourseListComponent } from '../../courses/course-list/course-list.component';
import { MainCourseCardComponent } from '../../../../shared/components/main-course-card/main-course-card.component';
import { ContentService } from '../../../../../core/Services/models/content.service';

@Component({
  selector: 'app-fatured-courses',
  standalone: true,
  imports: [NgFor, MainCourseCardComponent],
  templateUrl: './fatured-courses.component.html',
  styleUrl: './fatured-courses.component.css',
})
export class FaturedCoursesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 6;
  loading: boolean = false;
  error: string;
  courses: any[];

  constructor(private contentService: ContentService) {}
  ngOnInit(): void {
    console.log('oninitte');
    this.contentService
      .getTopContents(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.courses = [...response.contents.$values];
        },
        error: (err) => {
          console.log('ERR: ', err);
        },
      });
  }
}
