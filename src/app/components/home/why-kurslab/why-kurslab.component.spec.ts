import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyKurslabComponent } from './why-kurslab.component';

describe('WhyKurslabComponent', () => {
  let component: WhyKurslabComponent;
  let fixture: ComponentFixture<WhyKurslabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyKurslabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyKurslabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
