import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBuilderLayoutComponent } from './activity-builder-layout.component';

describe('ActivityBuilderLayoutComponent', () => {
  let component: ActivityBuilderLayoutComponent;
  let fixture: ComponentFixture<ActivityBuilderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityBuilderLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityBuilderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
