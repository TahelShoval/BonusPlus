import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyBenefitComponent } from './apply-benefit.component';

describe('ApplyBenefitComponent', () => {
  let component: ApplyBenefitComponent;
  let fixture: ComponentFixture<ApplyBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyBenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
