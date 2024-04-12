import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSalesComponent } from './actions-sales.component';

describe('ActionsSalesComponent', () => {
  let component: ActionsSalesComponent;
  let fixture: ComponentFixture<ActionsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
