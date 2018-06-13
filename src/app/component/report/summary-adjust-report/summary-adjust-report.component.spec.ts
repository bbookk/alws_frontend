import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAdjustReportComponent } from './summary-adjust-report.component';

describe('SummaryAdjustReportComponent', () => {
  let component: SummaryAdjustReportComponent;
  let fixture: ComponentFixture<SummaryAdjustReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryAdjustReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryAdjustReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
