import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwelcomePage } from './loginwelcome.page';

describe('LoginwelcomePage', () => {
  let component: LoginwelcomePage;
  let fixture: ComponentFixture<LoginwelcomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginwelcomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginwelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
