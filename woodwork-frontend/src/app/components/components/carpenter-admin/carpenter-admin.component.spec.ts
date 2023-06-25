import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpenterAdminComponent } from './carpenter-admin.component';

describe('CarpenterAdminComponent', () => {
  let component: CarpenterAdminComponent;
  let fixture: ComponentFixture<CarpenterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpenterAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpenterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
