import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityContentTabComponent } from './activity-content-tab.component';

describe('ActivityContentTabComponent', () => {
  let component: ActivityContentTabComponent;
  let fixture: ComponentFixture<ActivityContentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityContentTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityContentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
