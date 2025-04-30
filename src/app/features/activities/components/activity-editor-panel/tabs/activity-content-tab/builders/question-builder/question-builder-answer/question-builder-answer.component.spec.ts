import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBuilderAnswerComponent } from './question-builder-answer.component';

describe('QuestionBuilderAnswerComponent', () => {
  let component: QuestionBuilderAnswerComponent;
  let fixture: ComponentFixture<QuestionBuilderAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBuilderAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBuilderAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
