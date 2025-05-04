import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBlockRendererComponent } from './question-block-renderer.component';

describe('QuestionBlockRendererComponent', () => {
  let component: QuestionBlockRendererComponent;
  let fixture: ComponentFixture<QuestionBlockRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBlockRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBlockRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
