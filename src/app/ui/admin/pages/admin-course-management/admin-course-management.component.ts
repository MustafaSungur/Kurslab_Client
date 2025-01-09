import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { LucideAngularModule, Search } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DatePipe, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { debounceTime } from 'rxjs';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CategoryService } from '../../../../core/Services/models/category.service';
import { ContentService } from '../../../../core/Services/models/content.service';
import { CommentService } from '../../../../core/Services/models/comment.service';
import { TransformDataService } from '../../../../core/Services/transform-data.service';

@Component({
  selector: 'app-admin-course-management',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    DropdownModule,
    ChartModule,
    TreeSelectModule,
    FormsModule,
    LucideAngularModule,
    ButtonModule,
    NgIf,
    DialogModule,
    DatePipe,
    ReactiveFormsModule,
    PaginationComponent,
  ],
  templateUrl: './admin-course-management.component.html',
  styleUrls: ['./admin-course-management.component.css'],
})
export class AdminCourseManagementComponent implements OnInit {
  searchIcon = Search;
  contentAnalysis: any;
  selectedContentComments: any;
  isContentCommentsOpen = false;

  searchTerm = new FormControl('');
  categoryId = new FormControl('');
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalContents: number;
  totalPages: number;

  commentSearchTerm = new FormControl('');
  selectedContents: any;
  contents: any = [];
  categories: any;

  barChartData: any = null;
  pieChartData: any = null;

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Kategoriler',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Eğitim Sayısı',
        },
      },
    },
  };

  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  constructor(
    private categoryService: CategoryService,
    private contentService: ContentService,
    private commentService: CommentService,
    private transformDataService: TransformDataService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = this.transformDataService.transformData(res.$values);
      },
      error: (err) => console.log(err),
    });

    this.contentService.getContentAnalysis().subscribe({
      next: (res) => {
        this.contentAnalysis = res;
        this.updateCharts();
      },
      error: (err) => console.log(err),
    });

    this.searchTerm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.onSearchChange());

    this.categoryId.valueChanges.subscribe(() => this.onCategoryChange());

    this.applyFilters();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onCategoryChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    const filters = {
      searchTerm: this.searchTerm.value,
      categoryId: (this.categoryId.value as any)?.key,
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
    };

    this.contentService.filterContents(filters).subscribe({
      next: (res) => {
        this.contents = res.contents.$values;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error(err),
    });
  }

  updateCharts(): void {
    if (this.contentAnalysis?.categoryStatistics.$values) {
      const filteredData =
        this.contentAnalysis.categoryStatistics.$values.filter(
          (category: any) => category.courseCount > 0 || category.totalViews > 0
        );
      this.barChartData = {
        labels: filteredData.map((category: any) => category.categoryName),
        datasets: [
          {
            label: 'Eğitim Sayısı',
            data: filteredData.map((category: any) => category.courseCount),
            backgroundColor: '#42A5F5',
          },
        ],
      };

      this.pieChartData = {
        labels: filteredData.map((category: any) => category.categoryName),
        datasets: [
          {
            data: filteredData.map((category: any) => category.totalViews),
            backgroundColor: filteredData.map(
              () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
            ),
          },
        ],
      };
    }
  }

  resetFilters() {
    this.categoryId.setValue(null);
    this.searchTerm.setValue('');
    this.ngOnInit();
  }

  toggleCommentModal(content?: any) {
    console.log(content);
    if (content) {
      this.commentService.getCommentByContentId(content.id).subscribe({
        next: (res) => {
          this.selectedContentComments = res.$values;
          this.selectedContents = content;
        },
        error: (err) => console.log(err),
      });
    }
    this.selectedContents = null;
    this.selectedContentComments = null;
    this.isContentCommentsOpen = !this.isContentCommentsOpen;
  }

  deleteContent(contentId: number) {
    const isConfirm = confirm(
      `Bu yorumu silmek istediğinizden emin misiniz? (Yorum ID: ${contentId})`
    );
    if (isConfirm) {
      this.contentService.deleteContent(Number(contentId)).subscribe({
        next: (res) => {
          console.log(res);
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.ngOnInit();
        },
      });
    }
  }

  resetCommentFilter() {
    this.commentSearchTerm.setValue('');
  }

  get getFilteredComments(): any[] {
    return (
      this.selectedContentComments?.filter((comment: any) =>
        comment.description
          .toLowerCase()
          .includes(this.commentSearchTerm.value.toLowerCase())
      ) || []
    );
  }

  deleteComment(commentId: number): void {
    const isConfirm = confirm(
      `Bu yorumu silmek istediğinizden emin misiniz? (Yorum ID: ${commentId})`
    );
    if (isConfirm) {
      this.commentService.deleteComment(commentId).subscribe({
        next: (res) => {
          this.isContentCommentsOpen = false;
          this.ngOnInit();
        },
        error: (err) => {
          this.isContentCommentsOpen = false;
          this.ngOnInit();
          console.log(err);
        },
      });
    }
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.applyFilters();
  }
}
