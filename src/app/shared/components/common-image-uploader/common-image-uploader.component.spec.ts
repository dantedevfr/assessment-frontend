import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonImageUploaderComponent } from './common-image-uploader.component';

describe('CommonImageUploaderComponent', () => {
  let component: CommonImageUploaderComponent;
  let fixture: ComponentFixture<CommonImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonImageUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
