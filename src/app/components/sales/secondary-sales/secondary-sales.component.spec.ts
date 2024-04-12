import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarySalesComponent } from './secondary-sales.component';

describe('SecondarySalesComponent', () => {
  let component: SecondarySalesComponent;
  let fixture: ComponentFixture<SecondarySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondarySalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondarySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
