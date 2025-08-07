import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUsersViewComponent } from './find-users-view.component';

describe('FindUsersViewComponent', () => {
  let component: FindUsersViewComponent;
  let fixture: ComponentFixture<FindUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindUsersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
