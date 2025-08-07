import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingReyeetsViewComponent } from './following-reyeets-view.component';

describe('FollowingReyeetsViewComponent', () => {
  let component: FollowingReyeetsViewComponent;
  let fixture: ComponentFixture<FollowingReyeetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingReyeetsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingReyeetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
