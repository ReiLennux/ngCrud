import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalSalesComponent } from './principal-sales.component';

describe('PrincipalSalesComponent', () => {
  let component: PrincipalSalesComponent;
  let fixture: ComponentFixture<PrincipalSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
