import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxBookingComponent } from './box-booking.component';

describe('BoxBookingComponent', () => {
  let component: BoxBookingComponent;
  let fixture: ComponentFixture<BoxBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
