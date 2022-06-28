import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSummaryComponent } from './location-summary.component';

xdescribe('LocationSummaryComponent', () => {
  let component: LocationSummaryComponent;
  let fixture: ComponentFixture<LocationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
