import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-instructor-info',
  templateUrl: './instructor-info.component.html',
  styleUrls: ['./instructor-info.component.css'],
  standalone: true,
  imports: [NgIf, AvatarModule],
})
export class InstructorInfoComponent {
  @Input() instructor: any;

  getInitials(): string {
    return (
      this.instructor.firstName[0].toUpperCase() +
      this.instructor.lastName[0].toUpperCase()
    );
  }

  get instructorImage(): string {
    const img = this.instructor.image
      ? environment.baseURLFiles + this.instructor.image.replace(/\\/g, '/')
      : '../../../../assets/defaultProfile.png.png';
    return img;
  }
}
