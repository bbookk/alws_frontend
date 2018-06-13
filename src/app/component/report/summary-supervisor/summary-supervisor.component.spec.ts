import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySupervisorComponent } from './summary-supervisor.component';

describe('SummarySupervisorComponent', () => {
  let component: SummarySupervisorComponent;
  let fixture: ComponentFixture<SummarySupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
