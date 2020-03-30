import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatforumPage } from './chatforum.page';

describe('ChatforumPage', () => {
  let component: ChatforumPage;
  let fixture: ComponentFixture<ChatforumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatforumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatforumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
