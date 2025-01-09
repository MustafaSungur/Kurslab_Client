import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCourseCardComponent } from './main-course-card.component';

describe('MainCourseCardComponent', () => {
  let component: MainCourseCardComponent;
  let fixture: ComponentFixture<MainCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCourseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
