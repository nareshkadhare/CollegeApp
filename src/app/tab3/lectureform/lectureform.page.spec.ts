import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureformPage } from './lectureform.page';

describe('LectureformPage', () => {
  let component: LectureformPage;
  let fixture: ComponentFixture<LectureformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
