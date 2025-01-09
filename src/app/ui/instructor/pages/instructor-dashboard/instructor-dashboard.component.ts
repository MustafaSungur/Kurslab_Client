import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, BookOpen, Upload } from 'lucide-angular';
import { InstructorCourseCardComponent } from '../../components/instructor-course-card/instructor-course-card.component';
import { UploadModalComponent } from '../../components/upload-modal/upload-modal.component';
import { AuthService } from '../../../../core/Services/auth.service';
import { ContentService } from '../../../../core/Services/models/content.service';
import { CategoryService } from '../../../../core/Services/models/category.service';
import { TagService } from '../../../../core/Services/models/tag.service';
import { TransformDataService } from '../../../../core/Services/transform-data.service';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [
    NgIf,
    LucideAngularModule,
    InstructorCourseCardComponent,
    NgFor,
    UploadModalComponent,
  ],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css',
})
export class InstructorDashboardComponent implements OnInit {
  uploadIcon = Upload;
  bookOpenIcon = BookOpen;

  uploadModalVisible = false;
  courses: any = [];
  userID: string;
  categories: any;
  tags: any;

  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private transformDataService: TransformDataService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData(): void {
    this.authService.user$.subscribe((user) => {
      this.userID = user.userID;
      this.categoryService.getAllCategories().subscribe({
        next: (res: any) => {
          console.log(res);
          this.categories = this.transformDataService.transformData(
            res.$values
          );
        },
        error: (err) => console.log(err),
      });

      this.tagService.getAllTag().subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.$values) {
            this.tags = this.transformDataService.transformData(res.$values);
          } else {
            console.error('Invalid data structure:', res);
          }
        },
        error: (err) => console.log(err),
      });
      this.contentService.getContentByUserId(this.userID).subscribe({
        next: (res: any) => {
          console.log(res);
          this.courses = [...res.$values];
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
  uploadToogleModal() {
    this.uploadModalVisible = !this.uploadModalVisible;
  }
}
