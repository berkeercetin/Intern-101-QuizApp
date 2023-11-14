import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateEmailPage } from './update-email.page';

describe('UpdateEmailPage', () => {
  let component: UpdateEmailPage;
  let fixture: ComponentFixture<UpdateEmailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
