import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordCardsSubjectsPage } from './word-cards-subjects.page';

describe('WordCardsSubjectsPage', () => {
  let component: WordCardsSubjectsPage;
  let fixture: ComponentFixture<WordCardsSubjectsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WordCardsSubjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
