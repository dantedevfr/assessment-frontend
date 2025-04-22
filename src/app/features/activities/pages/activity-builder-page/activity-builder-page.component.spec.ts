import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBuilderPageComponent } from './activity-builder-page.component';

describe('ActivityBuilderPageComponent', () => {
  let component: ActivityBuilderPageComponent;
  let fixture: ComponentFixture<ActivityBuilderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityBuilderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityBuilderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
