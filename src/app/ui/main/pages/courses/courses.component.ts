import { Component, OnInit } from '@angular/core';

import { NgClass, NgIf } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CourseListComponent } from '../../components/courses/course-list/course-list.component';
import { FilterSidebarComponent } from '../../components/courses/filter-sidebar/filter-sidebar.component';
import { ContentService } from '../../../../core/Services/models/content.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  imports: [
    FilterSidebarComponent,
    CourseListComponent,
    PaginationComponent,
    NgClass,
  ],
})
export class CoursesComponent implements OnInit {
  isOpenSidebar = false;

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
        this.isOpenSidebar = false;
        console.log(response);
      },
      error: (err) => {
        console.error('Veri alınırken hata oluştu:', err);
      },
    });
  }

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }
}
