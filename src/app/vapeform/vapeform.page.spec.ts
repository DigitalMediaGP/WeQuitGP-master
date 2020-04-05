import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VapeformPage } from './vapeform.page';

describe('VapeformPage', () => {
  let component: VapeformPage;
  let fixture: ComponentFixture<VapeformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VapeformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VapeformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
