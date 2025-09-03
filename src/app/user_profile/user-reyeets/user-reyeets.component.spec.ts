import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReyeetsComponent } from './user-reyeets.component';

describe('UserReyeetsComponent', () => {
  let component: UserReyeetsComponent;
  let fixture: ComponentFixture<UserReyeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReyeetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReyeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
