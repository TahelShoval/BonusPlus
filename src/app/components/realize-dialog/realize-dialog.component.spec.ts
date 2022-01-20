import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizeDialogComponent } from './realize-dialog.component';

describe('RealizeDialogComponent', () => {
  let component: RealizeDialogComponent;
  let fixture: ComponentFixture<RealizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
