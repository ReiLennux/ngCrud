import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatFilterComponent } from './subcat-filter.component';

describe('SubcatFilterComponent', () => {
  let component: SubcatFilterComponent;
  let fixture: ComponentFixture<SubcatFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcatFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
