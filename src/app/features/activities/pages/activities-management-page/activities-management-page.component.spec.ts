import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesManagementPageComponent } from './activities-management-page.component';

describe('ActivitiesManagementPageComponent', () => {
  let component: ActivitiesManagementPageComponent;
  let fixture: ComponentFixture<ActivitiesManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
