import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Pi, Clock, Star, Users, LucideAngularModule } from 'lucide-angular';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { DurationPipe } from '../../../../core/pipes/duration.pipe';
import { ResourceUrlDirective } from '../../../../core/directives/resource-url.directive';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-main-course-card',
  standalone: true,
  imports: [
    CardModule,
    ChipModule,
    LucideAngularModule,
    AvatarModule,
    ButtonModule,
    RouterModule,
    NgFor,
    DurationPipe,
    ResourceUrlDirective,
  ],
  templateUrl: './main-course-card.component.html',
  styleUrl: './main-course-card.component.css',
})
export class MainCourseCardComponent {
  defaultImage = '../../../../assets/contetDefault.png';
  Users = Users;
  Star = Star;
  Clock = Clock;
  Pi = Pi;

  @Input() course: any;

  get instructorImage(): string {
    const img = this.course.imageUrl
      ? environment.baseURLFiles +
        this.course.createdUser.image.replace(/\\/g, '/')
      : '../../../../assets/contetDefault.png';
    return img;
  }
}
