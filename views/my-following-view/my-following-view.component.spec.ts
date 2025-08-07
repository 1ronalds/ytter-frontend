import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowingViewComponent } from './my-following-view.component';

describe('MyFollowingViewComponent', () => {
  let component: MyFollowingViewComponent;
  let fixture: ComponentFixture<MyFollowingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFollowingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
