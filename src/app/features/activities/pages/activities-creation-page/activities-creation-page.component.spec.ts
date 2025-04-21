import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesCreationPageComponent } from './activities-creation-page.component';

describe('ActivitiesCreationPageComponent', () => {
  let component: ActivitiesCreationPageComponent;
  let fixture: ComponentFixture<ActivitiesCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesCreationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
