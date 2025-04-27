import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBuilderTranslationComponent } from './question-builder-translation.component';

describe('QuestionBuilderTranslationComponent', () => {
  let component: QuestionBuilderTranslationComponent;
  let fixture: ComponentFixture<QuestionBuilderTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBuilderTranslationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBuilderTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
