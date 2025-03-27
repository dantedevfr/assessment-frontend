import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCreatePageComponent } from './courses-create-page.component';

describe('CoursesCreatePageComponent', () => {
  let component: CoursesCreatePageComponent;
  let fixture: ComponentFixture<CoursesCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
