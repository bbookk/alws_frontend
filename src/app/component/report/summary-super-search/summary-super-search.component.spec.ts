import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySuperSearchComponent } from './summary-super-search.component';

describe('SummarySuperSearchComponent', () => {
  let component: SummarySuperSearchComponent;
  let fixture: ComponentFixture<SummarySuperSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySuperSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySuperSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
