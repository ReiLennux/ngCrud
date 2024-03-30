import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalProductsComponent } from './principal-products.component';

describe('PrincipalProductsComponent', () => {
  let component: PrincipalProductsComponent;
  let fixture: ComponentFixture<PrincipalProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
