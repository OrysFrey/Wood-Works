import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesCarpenterComponent } from './solicitudes-carpenter.component';

describe('SolicitudesCarpenterComponent', () => {
  let component: SolicitudesCarpenterComponent;
  let fixture: ComponentFixture<SolicitudesCarpenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesCarpenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesCarpenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
