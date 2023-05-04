import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpentersCustomersComponent } from './carpenters-customers.component';

describe('CarpentersCustomersComponent', () => {
  let component: CarpentersCustomersComponent;
  let fixture: ComponentFixture<CarpentersCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpentersCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpentersCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
