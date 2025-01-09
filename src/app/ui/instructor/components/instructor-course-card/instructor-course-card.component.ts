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

import { UpdateModaComponent } from '../update-moda/update-moda.component';
import { DurationPipe } from '../../../../core/pipes/duration.pipe';
import { ResourceUrlDirective } from '../../../../core/directives/resource-url.directive';
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
    UpdateModaComponent,
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
  updateModalVisible = false;
  @Input() categories: any;
  @Input() tags: any;
  @Input() course: any;
  updateToggleModal() {
    this.updateModalVisible = !this.updateModalVisible;
  }
}
