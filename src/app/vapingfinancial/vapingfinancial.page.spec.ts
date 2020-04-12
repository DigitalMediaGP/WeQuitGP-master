import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VapingfinancialPage } from './vapingfinancial.page';

describe('VapingfinancialPage', () => {
  let component: VapingfinancialPage;
  let fixture: ComponentFixture<VapingfinancialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VapingfinancialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VapingfinancialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
