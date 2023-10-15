import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordCardsDeckPage } from './word-cards-deck.page';

describe('WordCardsDeckPage', () => {
  let component: WordCardsDeckPage;
  let fixture: ComponentFixture<WordCardsDeckPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WordCardsDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
