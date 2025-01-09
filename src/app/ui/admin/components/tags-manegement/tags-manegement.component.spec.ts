import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsManegementComponent } from './tags-manegement.component';

describe('TagsManegementComponent', () => {
  let component: TagsManegementComponent;
  let fixture: ComponentFixture<TagsManegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsManegementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsManegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
