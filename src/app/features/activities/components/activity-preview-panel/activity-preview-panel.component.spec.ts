import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPreviewPanelComponent } from './activity-preview-panel.component';

describe('ActivityPreviewPanelComponent', () => {
  let component: ActivityPreviewPanelComponent;
  let fixture: ComponentFixture<ActivityPreviewPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityPreviewPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPreviewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
