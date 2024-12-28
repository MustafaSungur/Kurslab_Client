import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorInfoComponent } from './instructor-info.component';

describe('InstructorInfoComponent', () => {
  let component: InstructorInfoComponent;
  let fixture: ComponentFixture<InstructorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
