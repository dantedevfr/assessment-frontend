import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAudioUploaderComponent } from './common-audio-uploader.component';

describe('CommonAudioUploaderComponent', () => {
  let component: CommonAudioUploaderComponent;
  let fixture: ComponentFixture<CommonAudioUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonAudioUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonAudioUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
