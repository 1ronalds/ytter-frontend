import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustRegisteredComponent } from './just-registered.component';

describe('JustRegisteredComponent', () => {
  let component: JustRegisteredComponent;
  let fixture: ComponentFixture<JustRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustRegisteredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
