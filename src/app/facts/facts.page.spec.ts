import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsPage } from './facts.page';

describe('FactsPage', () => {
  let component: FactsPage;
  let fixture: ComponentFixture<FactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
