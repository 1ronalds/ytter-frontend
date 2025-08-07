import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowersViewComponent } from './my-followers-view.component';

describe('MyFollowersViewComponent', () => {
  let component: MyFollowersViewComponent;
  let fixture: ComponentFixture<MyFollowersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFollowersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFollowersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
