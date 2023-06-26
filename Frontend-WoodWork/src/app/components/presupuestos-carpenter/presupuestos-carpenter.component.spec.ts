import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosCarpenterComponent } from './presupuestos-carpenter.component';

describe('PresupuestosCarpenterComponent', () => {
  let component: PresupuestosCarpenterComponent;
  let fixture: ComponentFixture<PresupuestosCarpenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestosCarpenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestosCarpenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
