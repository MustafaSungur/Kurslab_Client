import { Component } from '@angular/core';

import { FaturedCoursesComponent } from '../../../components/home/fatured-courses/fatured-courses.component';
import { WhyKurslabComponent } from '../../../components/home/why-kurslab/why-kurslab.component';
import { HeroSectionComponent } from '../../../components/home/hero-section/hero-section.component';
import { CallToActionComponent } from '../../../components/home/call-to-action/call-to-action.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CallToActionComponent,
    FaturedCoursesComponent,
    WhyKurslabComponent,
    HeroSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
