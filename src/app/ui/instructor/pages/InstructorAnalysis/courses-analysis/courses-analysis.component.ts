import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DatePipe } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, BarChart2 } from 'lucide-angular';
import { ContentService } from '../../../../../core/Services/models/content.service';
import { AuthService } from '../../../../../core/Services/auth.service';

@Component({
  selector: 'app-courses-analysis',
  standalone: true,
  imports: [
    CardModule,
    ChartModule,
    TableModule,
    DatePipe,
    ButtonModule,
    RouterModule,
    LucideAngularModule,
  ],
  templateUrl: './courses-analysis.component.html',
  styleUrl: './courses-analysis.component.css',
})
export class CoursesAnalysisComponent implements OnInit {
  user: any;
  courses: any = [];
  totalViews: number = 0;
  totalRatings: number = 0;
  totalComments: number = 0;
  averageRating: number = 0;
  courseAnalytics: any[] = [];
  chartData: any;
  chartOptions: any;
  analizIcon = BarChart2;
  constructor(
    private contentService: ContentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;

      if (this.user?.userID) {
        this.contentService.getContentByUserId(this.user.userID).subscribe({
          next: (res: any) => {
            this.courses = res.$values;
            this.calculateMetrics();
            this.prepareChartData();
          },
          error: (err) => console.log(err),
        });
      }
    });
  }

  calculateMetrics() {
    this.totalViews = this.courses.reduce(
      (sum: number, course: any) => sum + course.viewCount,
      0
    );

    this.totalRatings = this.courses.reduce(
      (sum: number, course: any) => sum + course.ratingCount,
      0
    );

    this.totalComments = this.courses.reduce(
      (sum: number, course: any) => sum + course.comments.$values.length,
      0
    );

    this.averageRating =
      this.totalRatings > 0
        ? this.courses.reduce(
            (sum: number, course: any) =>
              sum + course.rating * course.ratingCount,
            0
          ) / this.totalRatings
        : 0;

    this.courseAnalytics = this.courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      views: course.viewCount,
      rating: course.rating,
      ratingCount: course.ratingCount,
      commentCount: course.comments.$values.length,
      createdDate: course.createdDate,
    }));
  }

  prepareChartData() {
    this.chartData = {
      labels: this.courseAnalytics.map((c) => c.title),
      datasets: [
        {
          label: 'İzlenme',
          data: this.courseAnalytics.map((c) => c.views),
          backgroundColor: '#42A5F5',
        },
        {
          label: 'Puan',
          data: this.courseAnalytics.map((c) => c.rating),
          backgroundColor: '#66BB6A',
        },
        {
          label: 'Yorum Sayısı',
          data: this.courseAnalytics.map((c) => c.commentCount),
          backgroundColor: '#FFA726',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14, // Lejant (legend) yazı tipi boyutu
            },
          },
        },
        tooltip: {
          titleFont: {
            size: 16, // Tooltip başlık yazı boyutu
          },
          bodyFont: {
            size: 18, // Tooltip gövde yazı boyutu
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 16, // X ekseni yazı boyutu
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 16, // Y ekseni yazı boyutu
            },
          },
        },
      },
    };
  }
}
