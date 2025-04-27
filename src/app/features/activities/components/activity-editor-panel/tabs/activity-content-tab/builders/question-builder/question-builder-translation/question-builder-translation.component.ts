import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { WordModel } from '../../../../../../../models/word.model';

@Component({
  selector: 'app-question-builder-translation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    MessageModule,
    TextareaModule,
    InputTextModule,
    FileUploadModule,
    DividerModule,
    AccordionModule
  ],
  templateUrl: './question-builder-translation.component.html',
})
export class AppQuestionBuilderTranslationComponent {
  @Input() showTranslation = false;
  @Input() showWordModal = false;
  @Input() translationText = '';
  @Input() tempWordBreakdown: WordModel[] = [];
  @Input() textHasChanged = false;
  @Input() expandedWordIds: Set<number> = new Set();

  @Output() translationTextChange = new EventEmitter<string>();
  @Output() openWordTranslationModal = new EventEmitter<void>();
  @Output() saveWordTranslation = new EventEmitter<void>();
  @Output() cancelWordTranslation = new EventEmitter<void>();
  @Output() regenerateWordBreakdown = new EventEmitter<void>();
  @Output() toggleExpandWord = new EventEmitter<number>();
  @Output() wordMediaSelect = new EventEmitter<{ event: any, word: WordModel }>();

  uploadedWordFiles: File[] = [];

  onTranslationChange(value: string) {
    this.translationTextChange.emit(value);
  }

  onOpenWordTranslation() {
    this.openWordTranslationModal.emit();
  }

  onSaveWordTranslation() {
    this.saveWordTranslation.emit();
  }

  onCancelWordTranslation() {
    this.cancelWordTranslation.emit();
  }

  onRegenerateWords() {
    this.regenerateWordBreakdown.emit();
  }

  onToggleExpandWord(wordId: number) {
    this.toggleExpandWord.emit(wordId);
  }

  onSelectWordMedia(event: any, word: WordModel) {
    this.uploadedWordFiles = event.files;
    this.wordMediaSelect.emit({ event, word });
  }

  onClearUpload() {
    this.uploadedWordFiles = [];
  }

  onRemoveUpload() {
    this.uploadedWordFiles = [];
  }
}
