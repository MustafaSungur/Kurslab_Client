import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';

import { DatePipe } from '@angular/common';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { InstructorInfoComponent } from '../../components/course-details/instructor-info/instructor-info.component';
import { CourseInfoComponent } from '../../components/course-details/course-info/course-info.component';
import { CommentSectionComponent } from '../../components/course-details/comment-section/comment-section.component';
import { ResourceUrlDirective } from '../../../../core/directives/resource-url.directive';
import { ContentService } from '../../../../core/Services/models/content.service';
import { ContentUserService } from '../../../../core/Services/models/content-user.service';
import { AuthService } from '../../../../core/Services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  standalone: true,
  imports: [
    PanelModule,
    InstructorInfoComponent,
    CourseInfoComponent,
    DatePipe,
    CommentSectionComponent,
    RouterModule,
    ResourceUrlDirective,
  ],
})
export class CourseDetailComponent implements OnInit {
  paramValue: string | null;
  loading: boolean;
  errorCourse: string;
  course: any;
  currentUser: any;
  errorViewed: string;
  constructor(
    private contenService: ContentService,
    private route: ActivatedRoute,
    private contentUserService: ContentUserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });

    this.route.paramMap.subscribe((params) => {
      this.paramValue = params.get('id');
    });

    this.contenService.getContentById(Number(this.paramValue)).subscribe({
      next: (response) => {
        this.course = { ...response };
      },
      error: (err) => {
        this.errorCourse = err.message;
        console.log(err);
      },
    });

    this.contentUserService
      .viewedContent(Number(this.paramValue), this.currentUser.userID)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          this.errorViewed = err.message;
        },
      });
  }
}
