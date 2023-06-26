import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsUsersComponent } from './questions-users.component';

describe('QuestionsUsersComponent', () => {
  let component: QuestionsUsersComponent;
  let fixture: ComponentFixture<QuestionsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
