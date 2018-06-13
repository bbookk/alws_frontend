import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOrganizationComponent } from './summary-organization.component';

describe('SummaryOrganizationComponent', () => {
  let component: SummaryOrganizationComponent;
  let fixture: ComponentFixture<SummaryOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
