import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDesignTabComponent } from './activity-design-tab.component';

describe('ActivityDesignTabComponent', () => {
  let component: ActivityDesignTabComponent;
  let fixture: ComponentFixture<ActivityDesignTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDesignTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDesignTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
