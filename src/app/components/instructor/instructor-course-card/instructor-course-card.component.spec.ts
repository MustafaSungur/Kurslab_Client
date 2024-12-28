import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseCardComponent } from './instructor-course-card.component';

describe('InstructorCourseCardComponent', () => {
  let component: InstructorCourseCardComponent;
  let fixture: ComponentFixture<InstructorCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorCourseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
