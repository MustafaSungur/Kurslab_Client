import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../Services/models/content.service';
import { MainCourseCardComponent } from '../../shared/main-course-card/main-course-card.component';
import { NgFor } from '@angular/common';
import { CourseListComponent } from '../../courses/course-list/course-list.component';

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
