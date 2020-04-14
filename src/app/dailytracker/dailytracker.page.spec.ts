import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailytrackerPage } from './dailytracker.page';

describe('DailytrackerPage', () => {
  let component: DailytrackerPage;
  let fixture: ComponentFixture<DailytrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailytrackerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailytrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
