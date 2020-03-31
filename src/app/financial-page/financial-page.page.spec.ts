import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPagePage } from './financial-page.page';

describe('FinancialPagePage', () => {
  let component: FinancialPagePage;
  let fixture: ComponentFixture<FinancialPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
