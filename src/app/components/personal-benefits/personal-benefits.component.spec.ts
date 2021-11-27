import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBenefitsComponent } from './personal-benefits.component';

describe('PersonalBenefitsComponent', () => {
  let component: PersonalBenefitsComponent;
  let fixture: ComponentFixture<PersonalBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
