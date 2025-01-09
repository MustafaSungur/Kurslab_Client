import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModaComponent } from './update-moda.component';

describe('UpdateModaComponent', () => {
  let component: UpdateModaComponent;
  let fixture: ComponentFixture<UpdateModaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
