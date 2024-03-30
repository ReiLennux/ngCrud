import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFilterComponent } from './cat-filter.component';

describe('CatFilterComponent', () => {
  let component: CatFilterComponent;
  let fixture: ComponentFixture<CatFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
