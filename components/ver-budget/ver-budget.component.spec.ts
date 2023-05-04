import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBudgetComponent } from './ver-budget.component';

describe('VerBudgetComponent', () => {
  let component: VerBudgetComponent;
  let fixture: ComponentFixture<VerBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
