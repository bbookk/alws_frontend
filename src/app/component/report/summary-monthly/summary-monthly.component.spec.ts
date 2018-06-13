import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMonthlyComponent } from './summary-monthly.component';

describe('SummaryyMonthlyAgentComponent', () => {
  let component: SummaryMonthlyComponent;
  let fixture: ComponentFixture<SummaryMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
