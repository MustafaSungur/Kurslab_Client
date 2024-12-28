import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, BookOpen, Upload } from 'lucide-angular';
import { AuthService } from '../../../Services/auth.service';
import { ContentService } from '../../../Services/models/content.service';
import { InstructorCourseCardComponent } from '../../../components/instructor/instructor-course-card/instructor-course-card.component';
import { UploadModalComponent } from '../../../components/instructor/upload-modal/upload-modal.component';

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
export class InstructorDashboardComponent {
  uploadIcon = Upload;
  bookOpenIcon = BookOpen;

  uploadModalVisible = false;
  courses: any = [];
  userID: string;
  constructor(
    private authService: AuthService,
    private contentService: ContentService
  ) {
    authService.user$.subscribe((user) => {
      this.userID = user.userID;

      contentService.getContentByUserId(this.userID).subscribe({
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

  toogleModal() {
    console.log(this.uploadModalVisible);
    this.uploadModalVisible = !this.uploadModalVisible;
  }
}
