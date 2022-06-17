import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSummaryItemComponent } from './car-summary-item.component';

describe('CarSummaryItemComponent', () => {
  let component: CarSummaryItemComponent;
  let fixture: ComponentFixture<CarSummaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSummaryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
