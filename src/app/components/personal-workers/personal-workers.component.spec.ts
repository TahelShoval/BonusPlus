import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalWorkersComponent } from './personal-workers.component';

describe('PersonalWorkersComponent', () => {
  let component: PersonalWorkersComponent;
  let fixture: ComponentFixture<PersonalWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
