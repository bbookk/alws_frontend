import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAllowanceReportComponent } from './approve-allowance-report.component';

describe('ApproveAllowanceReportComponent', () => {
  let component: ApproveAllowanceReportComponent;
  let fixture: ComponentFixture<ApproveAllowanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAllowanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAllowanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
