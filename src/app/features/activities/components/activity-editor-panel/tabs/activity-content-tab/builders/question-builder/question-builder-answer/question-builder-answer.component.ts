import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AnswerModel } from '../../../../../../../models/answer.model';
import { QuestionModel,QuestionType } from '../../../../../../../models/question.model';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { QuestionBuilderAnswerAdvancedComponent } from '../answer-advanced/answer-advanced.component';
import { MediaModel } from '../../../../../../../models/media.model';
import { TranslationModel } from '../../../../../../../models/translation.model';

@Component({
  selector: 'app-question-builder-answer',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextModule,
    TooltipModule,
  QuestionBuilderAnswerAdvancedComponent],
  templateUrl: './question-builder-answer.component.html'
})
export class AppQuestionBuilderAnswerComponent implements OnChanges {
  @Input() question!: QuestionModel;
  @Output() questionChange = new EventEmitter<QuestionModel>();

  isSingleAnswer = false;
  showAnswerModal = false;
  selectedAnswerIndex: number | null = null;
  selectedAnswer: AnswerModel = { text: '', isCorrect: false };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && changes['question'].currentValue) {
      this.isSingleAnswer = ['simple', 'true_false'].includes(this.question.type);

      // 👇 Validar si se cambió el tipo y reaccionar
      const prevType = changes['question'].previousValue?.type;
      const currentType = this.question.type;

      if (prevType && prevType !== currentType) {
        this.resetAnswersForType(currentType);
      }

      this.initAnswersIfNeeded();
    }
  }

  ngOnInit(): void {
    this.isSingleAnswer = this.question.type === 'simple';
    this.initAnswersIfNeeded();
  }

  get selectedSingleAnswerIndex(): number {
    return this.question.answers?.findIndex(a => a.isCorrect) ?? -1;
  }

  trackByIndex(index: number): number {
    return index;
  }

  showAnswers(): boolean {
    return this.question.type !== 'open';
  }

  canAddMore(): boolean {
    return ['multiple_choice', 'simple'].includes(this.question.type);
  }

  initAnswersIfNeeded(): void {
    if (!this.question.answers || this.question.answers.length === 0) {
      if (this.question.type === 'true_false') {
        this.questionChange.emit({
          ...this.question,
          answers: [
            { text: 'Verdadero', isCorrect: false },
            { text: 'Falso', isCorrect: false }
          ]
        });
      } else {
        const defaultAnswers = Array.from({ length: 4 }, () => ({ text: '', isCorrect: false }));
        this.questionChange.emit({
          ...this.question,
          answers: defaultAnswers
        });
      }
    }
  }

  onAnswerTextChange(index: number, newText: string): void {
    const updatedAnswers = this.question.answers!.map((a, i) =>
      i === index ? { ...a, text: newText } : a
    );

    this.questionChange.emit({
      ...this.question,
      answers: updatedAnswers
    });
  }

  toggleCorrectAnswer(index: number): void {
    const updatedAnswers = this.question.answers!.map((a, i) =>
      i === index ? { ...a, isCorrect: !a.isCorrect } : a
    );

    this.questionChange.emit({
      ...this.question,
      answers: updatedAnswers
    });
  }

  setCorrectAnswer(index: number): void {
    const updatedAnswers = this.question.answers!.map((a, i) => ({
      ...a,
      isCorrect: i === index
    }));

    this.questionChange.emit({
      ...this.question,
      answers: updatedAnswers
    });
  }

  removeAnswer(index: number): void {
    const updatedAnswers = this.question.answers!.filter((_, i) => i !== index);

    this.questionChange.emit({
      ...this.question,
      answers: updatedAnswers
    });
  }

  addAnswer(): void {
    const newAnswer: AnswerModel = { text: '', isCorrect: false };
    const updatedAnswers = [...this.question.answers!, newAnswer];

    this.questionChange.emit({
      ...this.question,
      answers: updatedAnswers
    });
  }

  private resetAnswersForType(type: QuestionType): void {
    let answers: AnswerModel[] = [];

    if (type === 'true_false') {
      answers = [
        { text: 'Verdadero', isCorrect: false },
        { text: 'Falso', isCorrect: false }
      ];
    } else if (type === 'multiple_choice' || type === 'simple') {
      answers = Array.from({ length: 4 }, () => ({ text: '', isCorrect: false }));
    } else if (type === 'open') {
      answers = []; // no respuestas visibles
    }

    this.questionChange.emit({
      ...this.question,
      answers
    });
  }

  openAdvancedOptions(index: number) {
    this.selectedAnswerIndex = index;
    this.showAnswerModal = true;
  }

  get selectedAdvancedAnswer(): AnswerModel | null {
    return this.selectedAnswerIndex !== null ? this.question.answers?.[this.selectedAnswerIndex] ?? null : null;
  }

  getTranslation(answer: AnswerModel | null): string {
    return answer?.translations?.[0]?.translatedText ?? '';
  }

  onAdvancedSave(data: { translation: string; media: MediaModel[] }) {
    if (this.selectedAnswerIndex === null || !this.question.answers) return;

    const updatedAnswers: AnswerModel[] = this.question.answers.map((a, i) => {
      if (i === this.selectedAnswerIndex) {
        const updatedTranslation = data.translation.trim();
        const translations: TranslationModel[] = updatedTranslation
          ? [{
              translatedText: updatedTranslation,
              languageCode: 'es',
              explanation: '',           // ⬅️ requerido por tu interfaz
              media: []                  // ⬅️ requerido por tu interfaz
            }]
          : [];

        return {
          ...a,
          translations,
          media: data.media
        };
      }
      return a;
    });

    this.questionChange.emit({
      ...this.question,
      answers: updatedAnswers
    });

    this.showAnswerModal = false;
    this.selectedAnswerIndex = null;
  }

  saveAnswerChanges() {
    if (this.selectedAnswerIndex === null) return;

    const updatedAnswers = [...this.question.answers!];
    updatedAnswers[this.selectedAnswerIndex] = { ...this.selectedAnswer };

    this.questionChange.emit({ ...this.question, answers: updatedAnswers });
    this.closeAnswerModal();
  }

  closeAnswerModal() {
    this.showAnswerModal = false;
    this.selectedAnswerIndex = null;
  }

  getImageUrl(answer: AnswerModel | null): string | null {
    return answer?.media?.find(m => m.type === 'image')?.url ?? null;
  }

  getAudioUrl(answer: AnswerModel | null): string | null {
    return answer?.media?.find(m => m.type === 'audio')?.url ?? null;
  }
}
