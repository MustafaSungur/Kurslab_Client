import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersManagementComponent } from './admin-users-management.component';

describe('AdminUsersManagementComponent', () => {
  let component: AdminUsersManagementComponent;
  let fixture: ComponentFixture<AdminUsersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
