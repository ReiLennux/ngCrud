import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryProductsComponent } from './secondary-products.component';

describe('SecondaryProductsComponent', () => {
  let component: SecondaryProductsComponent;
  let fixture: ComponentFixture<SecondaryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondaryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
