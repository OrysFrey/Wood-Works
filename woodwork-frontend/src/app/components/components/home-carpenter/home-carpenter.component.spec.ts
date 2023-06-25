import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarpenterComponent } from './home-carpenter.component';

describe('HomeCarpenterComponent', () => {
  let component: HomeCarpenterComponent;
  let fixture: ComponentFixture<HomeCarpenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarpenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarpenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
