import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseManagementComponent } from './admin-course-management.component';

describe('AdminCourseManagementComponent', () => {
  let component: AdminCourseManagementComponent;
  let fixture: ComponentFixture<AdminCourseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourseManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCourseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
