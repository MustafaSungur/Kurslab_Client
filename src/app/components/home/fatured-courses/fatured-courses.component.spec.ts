import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturedCoursesComponent } from './fatured-courses.component';

describe('FaturedCoursesComponent', () => {
  let component: FaturedCoursesComponent;
  let fixture: ComponentFixture<FaturedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturedCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaturedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
