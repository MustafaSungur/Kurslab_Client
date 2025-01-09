import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTagManagementComponent } from './category-tag-management.component';

describe('CategoryTagManagementComponent', () => {
  let component: CategoryTagManagementComponent;
  let fixture: ComponentFixture<CategoryTagManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTagManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryTagManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
