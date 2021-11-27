import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsUsedComponent } from './benefits-used.component';

describe('BenefitsUsedComponent', () => {
  let component: BenefitsUsedComponent;
  let fixture: ComponentFixture<BenefitsUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsUsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
