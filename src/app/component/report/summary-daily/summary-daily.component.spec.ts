import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDailyComponent } from './summary-daily.component';

describe('SummaryDailyComponent', () => {
  let component: SummaryDailyComponent;
  let fixture: ComponentFixture<SummaryDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
