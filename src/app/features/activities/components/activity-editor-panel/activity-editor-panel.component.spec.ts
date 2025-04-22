import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEditorPanelComponent } from './activity-editor-panel.component';

describe('ActivityEditorPanelComponent', () => {
  let component: ActivityEditorPanelComponent;
  let fixture: ComponentFixture<ActivityEditorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityEditorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityEditorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
