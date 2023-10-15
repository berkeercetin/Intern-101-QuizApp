import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordMemorizePagePage } from './word-memorize-page.page';

describe('WordMemorizePagePage', () => {
  let component: WordMemorizePagePage;
  let fixture: ComponentFixture<WordMemorizePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WordMemorizePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
