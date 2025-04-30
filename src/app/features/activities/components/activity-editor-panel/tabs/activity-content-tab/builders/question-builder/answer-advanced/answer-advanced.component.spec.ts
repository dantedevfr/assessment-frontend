import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBuilderAnswerAdvancedComponent } from './answer-advanced.component';

describe('QuestionBuilderAnswerAdvancedComponent', () => {
  let component: QuestionBuilderAnswerAdvancedComponent;
  let fixture: ComponentFixture<QuestionBuilderAnswerAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBuilderAnswerAdvancedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBuilderAnswerAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
