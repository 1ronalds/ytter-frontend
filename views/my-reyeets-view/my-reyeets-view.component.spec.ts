import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReyeetsViewComponent } from './my-reyeets-view.component';

describe('MyReyeetsViewComponent', () => {
  let component: MyReyeetsViewComponent;
  let fixture: ComponentFixture<MyReyeetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReyeetsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReyeetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
