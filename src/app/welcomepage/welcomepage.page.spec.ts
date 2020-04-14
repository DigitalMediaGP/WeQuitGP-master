import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomepagePage } from './welcomepage.page';

describe('WelcomepagePage', () => {
  let component: WelcomepagePage;
  let fixture: ComponentFixture<WelcomepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomepagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
