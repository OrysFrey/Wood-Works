import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCarpenterComponent } from './dashboard-carpenter.component';

describe('DashboardCarpenterComponent', () => {
  let component: DashboardCarpenterComponent;
  let fixture: ComponentFixture<DashboardCarpenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCarpenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCarpenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
