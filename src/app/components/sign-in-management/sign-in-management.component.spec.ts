import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInManagementComponent } from './sign-in-management.component';

describe('SignInManagementComponent', () => {
  let component: SignInManagementComponent;
  let fixture: ComponentFixture<SignInManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
