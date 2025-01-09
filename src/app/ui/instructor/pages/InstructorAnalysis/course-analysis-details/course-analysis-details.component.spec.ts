import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnalysisDetailsComponent } from './course-analysis-details.component';

describe('CourseAnalysisDetailsComponent', () => {
  let component: CourseAnalysisDetailsComponent;
  let fixture: ComponentFixture<CourseAnalysisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAnalysisDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
