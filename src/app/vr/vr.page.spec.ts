import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VRPage } from './vr.page';

describe('VRPage', () => {
  let component: VRPage;
  let fixture: ComponentFixture<VRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VRPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
