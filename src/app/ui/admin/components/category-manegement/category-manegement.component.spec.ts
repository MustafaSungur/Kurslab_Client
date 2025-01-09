import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManegementComponent } from './category-manegement.component';

describe('CategoryManegementComponent', () => {
  let component: CategoryManegementComponent;
  let fixture: ComponentFixture<CategoryManegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryManegementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryManegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
