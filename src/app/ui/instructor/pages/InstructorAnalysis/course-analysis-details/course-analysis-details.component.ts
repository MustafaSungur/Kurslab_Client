import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContentService } from '../../../../../core/Services/models/content.service';
import { CommentService } from '../../../../../core/Services/models/comment.service';

@Component({
  selector: 'app-course-analysis-details',
  standalone: true,
  imports: [CardModule, TableModule, DatePipe, RouterModule],
  templateUrl: './course-analysis-details.component.html',
  styleUrl: './course-analysis-details.component.css',
})
export class CourseAnalysisDetailsComponent implements OnInit {
  @Input() courseID: string;
  course: any;
  comments: any = [];
  constructor(
    private contentService: ContentService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseID = params.get('courseID');
    });
    this.contentService.getContentById(Number(this.courseID)).subscribe({
      next: (res) => {
        console.log('content: ', res);
        this.course = res;
      },
    });

    this.commentService.getCommentByContentId(Number(this.courseID)).subscribe({
      next: (res) => {
        console.log('comment: ', res);
        this.comments = res.$values;
      },
    });
  }
}
