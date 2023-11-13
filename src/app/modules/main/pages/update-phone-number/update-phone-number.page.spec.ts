import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePhoneNumberPage } from './update-phone-number.page';

describe('UpdatePhoneNumberPage', () => {
  let component: UpdatePhoneNumberPage;
  let fixture: ComponentFixture<UpdatePhoneNumberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePhoneNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
