import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryColumnComponent } from './category-column.component';

describe('CategoryColumnComponent', () => {
  let component: CategoryColumnComponent;
  let fixture: ComponentFixture<CategoryColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
