import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCuponComponent } from './show-cupon.component';

describe('ShowCuponComponent', () => {
  let component: ShowCuponComponent;
  let fixture: ComponentFixture<ShowCuponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCuponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
