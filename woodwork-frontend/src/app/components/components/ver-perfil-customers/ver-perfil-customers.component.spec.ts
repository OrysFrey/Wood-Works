import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilCustomersComponent } from './ver-perfil-customers.component';

describe('VerPerfilCustomersComponent', () => {
  let component: VerPerfilCustomersComponent;
  let fixture: ComponentFixture<VerPerfilCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPerfilCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPerfilCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
