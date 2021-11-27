import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAreaManagementComponent } from './private-area-management.component';

describe('PrivateAreaManagementComponent', () => {
  let component: PrivateAreaManagementComponent;
  let fixture: ComponentFixture<PrivateAreaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAreaManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAreaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
