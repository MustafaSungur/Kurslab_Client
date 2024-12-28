import { Component } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import {
  Pi,
  Clock,
  Star,
  Users,
  LucideAngularModule,
  Pencil,
  BarChart2,
} from 'lucide-angular';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { ResourceUrlDirective } from '../../../directives/resource-url.directive';
@Component({
  selector: 'app-instructor-course-card',
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
  templateUrl: './instructor-course-card.component.html',
  styleUrl: './instructor-course-card.component.css',
})
export class InstructorCourseCardComponent {
  barchartIcon = Pencil;
  pencilIcon = BarChart2;
  defaultImage = '../../../../assets/contetDefault.png';
  Users = Users;
  Star = Star;
  Clock = Clock;
  Pi = Pi;

  @Input() course: any;
}
