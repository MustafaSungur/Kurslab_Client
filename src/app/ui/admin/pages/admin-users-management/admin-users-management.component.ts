import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  GraduationCap,
  LucideAngularModule,
  Search,
  Users,
  UserSquare,
} from 'lucide-angular';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { debounceTime } from 'rxjs';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { UserService } from '../../../../core/Services/models/user.service';
import { CommentService } from '../../../../core/Services/models/comment.service';

@Component({
  selector: 'app-admin-users-management',
  standalone: true,
  imports: [
    LucideAngularModule,
    CardModule,
    ChartModule,
    TableModule,
    DropdownModule,
    DialogModule,
    DatePipe,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    PaginationComponent,
  ],
  templateUrl: './admin-users-management.component.html',
  styleUrl: './admin-users-management.component.css',
})
export class AdminUsersManagementComponent {
  usersIcon = Users;
  searchIcon = Search;
  userSquareIcon = UserSquare;
  graduationCapIcon = GraduationCap;

  chart1Data: any;
  chart2Data: any;
  options: any;

  userAnalysis: any = {};
  users: any = [];
  searchTerm = new FormControl('');
  roleFilter = new FormControl(null);
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalContents: number;
  totalPages: number;
  selectedUser: any = null;
  isUserCommentsOpen = false;
  commentSearchTerm = new FormControl('');
  filteredComments: any = [];

  colorConfig = {
    students: '#06b6d4', // Cyan
    instructors: '#f97316', // Orange
    activeUsers: '#22c55e', // Green
    deletedUsers: '#6b7280', // Gray
  };

  role = [
    { key: 1, value: 'Öğrenci' },
    { key: 2, value: 'Eğitmen' },
  ];

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsersAnalysis().subscribe({
      next: (res) => {
        this.userAnalysis = { ...res };
        this.initCharts(this.userAnalysis);
      },
      error: (err) => console.log(err),
    });

    this.applyFilters();
    this.searchTerm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.onSearchChange());
    this.roleFilter.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.onRoleChange());
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onRoleChange() {
    this.currentPage = 1;
    this.applyFilters();
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.applyFilters();
  }

  applyFilters(): void {
    const filter = {
      searchTerm: this.searchTerm.value,
      role: this.roleFilter.value?.key,
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
    };
    this.userService.filterUsers(filter).subscribe({
      next: (res) => {
        this.users = res.users.$values;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.log(err),
    });
  }

  resetFilters(): void {
    this.searchTerm.setValue('');
    this.roleFilter.setValue('all');
    this.currentPage = 1;
  }

  deleteUser(id: string): void {
    const isConfirm = confirm(
      'Bu kullanıcıyı silmek istediğinizden emin misiniz?'
    );
    if (isConfirm) {
      this.userService.deleteUser(id).subscribe({
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

  deleteComment(commentId: number): void {
    const isConfirm = confirm(
      `Bu yorumu silmek istediğinizden emin misiniz? (Yorum ID: ${commentId})`
    );
    if (isConfirm) {
      this.commentService.deleteComment(commentId).subscribe({
        next: (res) => {
          this.isUserCommentsOpen = false;
          this.ngOnInit();
        },
        error: (err) => {
          this.isUserCommentsOpen = false;
          this.ngOnInit();
          console.log(err);
        },
      });
    }
  }

  paginate(pageNumber: number): void {
    if (pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.applyFilters();
    }
  }

  get getFilteredComments(): any[] {
    return (
      this.selectedUser?.comments?.$values.filter((comment: any) =>
        comment.description
          .toLowerCase()
          .includes(this.commentSearchTerm.value.toLowerCase())
      ) || []
    );
  }

  resetCommentFilter() {
    this.commentSearchTerm.setValue('');
  }

  toggleCommentModal(user?: any) {
    if (user) {
      this.selectedUser = user.user;
    }
    this.isUserCommentsOpen = !this.isUserCommentsOpen;
  }

  initCharts(analiysis: any) {
    this.chart1Data = {
      labels: ['Öğrenciler', 'Eğitmenler'],
      datasets: [
        {
          data: [analiysis?.regularUsers, analiysis?.userAndInstructors],
          backgroundColor: [
            this.colorConfig.students,
            this.colorConfig.instructors,
          ],
        },
      ],
    };

    this.chart2Data = {
      labels: ['Aktif Kullanıcılar', 'Silinmiş Kullanıcılar'],
      datasets: [
        {
          data: [analiysis?.activeUsers, analiysis?.deletedUsers],
          backgroundColor: [
            this.colorConfig.activeUsers,
            this.colorConfig.deletedUsers,
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--p-text-color'
            ),
          },
        },
      },
    };
  }
}
