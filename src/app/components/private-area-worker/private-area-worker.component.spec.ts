import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAreaWorkerComponent } from './private-area-worker.component';

describe('PrivateAreaWorkerComponent', () => {
  let component: PrivateAreaWorkerComponent;
  let fixture: ComponentFixture<PrivateAreaWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAreaWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAreaWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
