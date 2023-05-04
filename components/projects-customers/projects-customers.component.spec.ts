import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCustomersComponent } from './projects-customers.component';

describe('ProjectsCustomersComponent', () => {
  let component: ProjectsCustomersComponent;
  let fixture: ComponentFixture<ProjectsCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
