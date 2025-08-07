import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsViewComponent } from './my-posts-view.component';

describe('MyPostsViewComponent', () => {
  let component: MyPostsViewComponent;
  let fixture: ComponentFixture<MyPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
