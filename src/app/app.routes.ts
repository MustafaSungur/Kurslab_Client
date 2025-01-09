import { Routes } from '@angular/router';
import { ifLoggedInGuard } from './core/guards/if-logged-in.guard';
import { authGuard } from './core/guards/auth.guard';
import { instructorGuard } from './core/guards/instructor.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    data: { preload: false },
    canMatch: [ifLoggedInGuard],
    loadComponent: () =>
      import('./ui/auth/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        data: { preload: false },
        canMatch: [ifLoggedInGuard],
        loadComponent: () =>
          import('./ui/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        data: { preload: false },
        canMatch: [ifLoggedInGuard],
        loadComponent: () =>
          import('./ui/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },

  {
    path: '',
    data: { preload: true },
    canMatch: [],
    loadComponent: () =>
      import('./ui/main/pages/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        data: { preload: true },
        canMatch: [],
        loadComponent: () =>
          import('./ui/main/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'courses',
        data: { preload: true },
        loadComponent: () =>
          import('./ui/main/pages/courses/courses.component').then(
            (m) => m.CoursesComponent
          ),
      },

      {
        path: 'courses/:id',
        data: { preload: false },
        canMatch: [authGuard],
        loadComponent: () =>
          import('./ui/main/pages/course-detail/course-detail.component').then(
            (m) => m.CourseDetailComponent
          ),
      },
      {
        path: 'dashboard',
        data: { preload: true },
        canMatch: [authGuard],
        loadComponent: () =>
          import(
            './ui/main/pages/dashboard/dashboard/dashboard.component'
          ).then((m) => m.DashboardComponent),
      },
      {
        path: 'dashboard/history/:userID',
        data: { preload: false },
        canMatch: [authGuard],
        loadComponent: () =>
          import('./ui/main/pages/dashboard/history/history.component').then(
            (m) => m.HistoryComponent
          ),
      },
    ],
  },
  {
    path: 'instructor/:userId',
    data: { preload: false },
    canMatch: [authGuard, instructorGuard],
    loadComponent: () =>
      import(
        './ui/instructor/pages/instructor-layout/instructor-layout.component'
      ).then((m) => m.InstructorLayoutComponent),
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      {
        path: 'edit',
        data: { preload: false },
        canMatch: [authGuard, instructorGuard],
        loadComponent: () =>
          import(
            './ui/instructor/pages/instructor-dashboard/instructor-dashboard.component'
          ).then((m) => m.InstructorDashboardComponent),
      },
      {
        path: 'analysis',
        data: { preload: false },
        canMatch: [authGuard, instructorGuard],
        loadComponent: () =>
          import(
            './ui/instructor/pages/InstructorAnalysis/courses-analysis/courses-analysis.component'
          ).then((m) => m.CoursesAnalysisComponent),
      },
      {
        path: 'analysis/:courseID',
        data: { preload: false },
        canMatch: [authGuard, instructorGuard],
        loadComponent: () =>
          import(
            './ui/instructor/pages/InstructorAnalysis/course-analysis-details/course-analysis-details.component'
          ).then((m) => m.CourseAnalysisDetailsComponent),
      },
    ],
  },

  {
    path: 'admin',
    data: { preload: false },
    canMatch: [adminGuard],
    loadComponent: () =>
      import('./ui/admin/pages/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      {
        path: 'courses',
        data: { preload: false },
        canMatch: [authGuard, adminGuard],

        loadComponent: () =>
          import(
            './ui/admin/pages/admin-course-management/admin-course-management.component'
          ).then((m) => m.AdminCourseManagementComponent),
      },
      {
        path: 'users',
        data: { preload: false },
        canMatch: [authGuard, adminGuard],

        loadComponent: () =>
          import(
            './ui/admin/pages/admin-users-management/admin-users-management.component'
          ).then((m) => m.AdminUsersManagementComponent),
      },
      {
        path: 'categoryTag',
        data: { preload: false },
        canMatch: [authGuard, adminGuard],

        loadComponent: () =>
          import(
            './ui/admin/pages/category-tag-management/category-tag-management.component'
          ).then((m) => m.CategoryTagManagementComponent),
        children: [
          { path: '', redirectTo: 'category', pathMatch: 'full' },
          {
            path: 'category',
            data: { preload: false },
            canMatch: [authGuard, adminGuard],

            loadComponent: () =>
              import(
                './ui/admin/components/category-manegement/category-manegement.component'
              ).then((m) => m.CategoryManegementComponent),
          },
          {
            path: 'tag',
            data: { preload: false },
            canMatch: [authGuard, adminGuard],

            loadComponent: () =>
              import(
                './ui/admin/components/tags-manegement/tags-manegement.component'
              ).then((m) => m.TagsManegementComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'unauthorized',
    data: { preload: false },
    loadComponent: () =>
      import('./ui/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },
  {
    path: '**',
    data: { preload: false },
    loadComponent: () =>
      import('./ui/page404/page404.component').then((m) => m.Page404Component),
  },
];
