import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostBtnComponent } from './create-post-btn.component';

describe('CreatePostBtnComponent', () => {
  let component: CreatePostBtnComponent;
  let fixture: ComponentFixture<CreatePostBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
