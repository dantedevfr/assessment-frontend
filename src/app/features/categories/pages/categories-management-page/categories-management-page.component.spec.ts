import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagementPageComponent } from './categories-management-page.component';

describe('CategoriesManagementPageComponent', () => {
  let component: CategoriesManagementPageComponent;
  let fixture: ComponentFixture<CategoriesManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
