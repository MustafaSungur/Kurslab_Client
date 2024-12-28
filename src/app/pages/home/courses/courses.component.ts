import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../Services/models/content.service';
import { CourseListComponent } from '../../../components/courses/course-list/course-list.component';
import { PaginationComponent } from '../../../components/shared/pagination/pagination.component';
import { FilterSidebarComponent } from '../../../components/courses/filter-sidebar/filter-sidebar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  imports: [FilterSidebarComponent, CourseListComponent, PaginationComponent],
})
export class CoursesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalContents: number;
  totalPages: number;
  activeFilters: any = {};
  courses: any[] = [];
  totalItems: number = 0;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  onFiltersChanged(filters: any) {
    this.activeFilters = filters;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.applyFilters();
  }

  applyFilters() {
    const requestPayload = {
      ...this.activeFilters,
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
    };
    console.log(requestPayload);
    this.contentService.filterContents(requestPayload).subscribe({
      next: (response) => {
        this.courses = response.contents.$values;
        this.totalContents = response.totalContents;
        this.totalPages = response.totalPages;
        console.log(response);
      },
      error: (err) => {
        console.error('Veri alınırken hata oluştu:', err);
      },
    });
  }
}
