import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFormPage } from './subject-form.page';

describe('SubjectFormPage', () => {
  let component: SubjectFormPage;
  let fixture: ComponentFixture<SubjectFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
