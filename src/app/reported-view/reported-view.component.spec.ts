import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedViewComponent } from './reported-view.component';

describe('ReportedViewComponent', () => {
  let component: ReportedViewComponent;
  let fixture: ComponentFixture<ReportedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
