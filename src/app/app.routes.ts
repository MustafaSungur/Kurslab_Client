import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    data: { preload: false },
    canMatch: [],
    loadComponent: () =>
      import('./pages/auth/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        data: { preload: false },
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        data: { preload: false },
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(
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
      import('./pages/home/home-layout/home-layout.component').then(
        (m) => m.HomeLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        data: { preload: true },
        canMatch: [],
        loadComponent: () =>
          import('./pages/home/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'courses',
        data: { preload: true },
        loadComponent: () =>
          import('./pages/home/courses/courses.component').then(
            (m) => m.CoursesComponent
          ),
      },

      {
        path: 'courses/:id',
        data: { preload: false },
        canMatch: [],
        loadComponent: () =>
          import('./pages/home/course-detail/course-detail.component').then(
            (m) => m.CourseDetailComponent
          ),
      },
      {
        path: 'dashboard',
        data: { preload: true },
        canMatch: [],
        loadComponent: () =>
          import('./pages/home/dashboard/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'dashboard/history/:userID',
        data: { preload: false },
        loadComponent: () =>
          import('./pages/home/dashboard/history/history.component').then(
            (m) => m.HistoryComponent
          ),
      },
    ],
  },
  {
    path: 'instructor/:userId',
    data: { preload: false },
    canMatch: [],
    loadComponent: () =>
      import(
        './pages/instructor/instructor-layout/instructor-layout.component'
      ).then((m) => m.InstructorLayoutComponent),
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      {
        path: 'edit',
        data: { preload: false },
        loadComponent: () =>
          import(
            './pages/instructor/instructor-dashboard/instructor-dashboard.component'
          ).then((m) => m.InstructorDashboardComponent),
      },
      {
        path: 'analysis',
        data: { preload: false },
        loadComponent: () =>
          import(
            './pages/instructor/InstructorAnalysis/courses-analysis/courses-analysis.component'
          ).then((m) => m.CoursesAnalysisComponent),
        children: [
          {
            path: ':id',
            data: { preload: false },
            loadComponent: () =>
              import(
                './pages/instructor/InstructorAnalysis/course-analysis-details/course-analysis-details.component'
              ).then((m) => m.CourseAnalysisDetailsComponent),
          },
        ],
      },
    ],
  },

  {
    path: 'admin',
    data: { preload: false },
    canMatch: [],
    loadComponent: () =>
      import('./pages/admin/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      {
        path: 'courses',
        data: { preload: false },
        loadComponent: () =>
          import(
            './pages/admin/admin-course-management/admin-course-management.component'
          ).then((m) => m.AdminCourseManagementComponent),
      },
      {
        path: 'users',
        data: { preload: false },
        loadComponent: () =>
          import(
            './pages/admin/admin-users-management/admin-users-management.component'
          ).then((m) => m.AdminUsersManagementComponent),
      },
      {
        path: 'categoryTag',
        data: { preload: false },
        loadComponent: () =>
          import(
            './pages/admin/category-tag-management/category-tag-management.component'
          ).then((m) => m.CategoryTagManagementComponent),
      },
    ],
  },

  {
    path: '**',
    data: { preload: false },
    loadComponent: () =>
      import('./pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
