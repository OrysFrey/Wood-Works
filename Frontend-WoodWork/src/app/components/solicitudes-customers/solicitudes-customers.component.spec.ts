import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesCustomersComponent } from './solicitudes-customers.component';

describe('SolicitudesCustomersComponent', () => {
  let component: SolicitudesCustomersComponent;
  let fixture: ComponentFixture<SolicitudesCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
