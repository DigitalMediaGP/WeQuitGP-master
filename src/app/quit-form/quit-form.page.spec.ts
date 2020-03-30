import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitFormPage } from './quit-form.page';

describe('QuitFormPage', () => {
  let component: QuitFormPage;
  let fixture: ComponentFixture<QuitFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
