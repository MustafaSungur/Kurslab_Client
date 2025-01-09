import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAnalysisComponent } from './courses-analysis.component';

describe('CoursesAnalysisComponent', () => {
  let component: CoursesAnalysisComponent;
  let fixture: ComponentFixture<CoursesAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
