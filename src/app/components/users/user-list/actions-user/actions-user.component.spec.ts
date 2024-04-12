import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsUserComponent } from './actions-user.component';

describe('ActionsUserComponent', () => {
  let component: ActionsUserComponent;
  let fixture: ComponentFixture<ActionsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
