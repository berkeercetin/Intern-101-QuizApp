import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetNewPasswordPage } from './set-new-password.page';

describe('SetNewPasswordPage', () => {
  let component: SetNewPasswordPage;
  let fixture: ComponentFixture<SetNewPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetNewPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
