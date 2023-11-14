import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerPage } from './answer.page';

describe('AnswerPage', () => {
  let component: AnswerPage;
  let fixture: ComponentFixture<AnswerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
