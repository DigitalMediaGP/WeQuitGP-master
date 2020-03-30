import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediationPlayerPage } from './mediation-player.page';

describe('MediationPlayerPage', () => {
  let component: MediationPlayerPage;
  let fixture: ComponentFixture<MediationPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediationPlayerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediationPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
