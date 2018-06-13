import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginC2aComponent } from './login-c2a.component';

describe('LoginC2aComponent', () => {
  let component: LoginC2aComponent;
  let fixture: ComponentFixture<LoginC2aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginC2aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginC2aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
