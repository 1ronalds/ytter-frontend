import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingPostsViewComponent } from './following-posts-view.component';

describe('FollowingPostsViewComponent', () => {
  let component: FollowingPostsViewComponent;
  let fixture: ComponentFixture<FollowingPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingPostsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
