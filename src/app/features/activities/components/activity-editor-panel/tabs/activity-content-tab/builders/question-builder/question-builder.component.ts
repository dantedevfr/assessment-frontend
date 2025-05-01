import { AppQuestionBuilderAnswerComponent } from './question-builder-answer/question-builder-answer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { defaultQuestion, updateActivity } from '../../../../../../state';

import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { AppQuestionBuilderTranslationComponent } from './question-builder-translation/question-builder-translation.component';
import { NotificationService } from '../../../../../../../../core/services/notification.service';
import { MediaModel } from '../../../../../../models/media.model';
import { QuestionModel, QuestionType } from '../../../../../../models/question.model';
import { WordModel } from '../../../../../../models/word.model';
import {
  QUESTION_MEDIA_TYPES,
  DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG,
  QUESTION_EDITOR_STYLE,
  MEDIA_POSITIONS,
  QUESTION_TYPES

} from './../../../../../../config/question.config';

import { CommonImageUploaderComponent } from '../../../../../../../../shared/components/common-image-uploader/common-image-uploader.component';
import { CommonAudioUploaderComponent } from '../../../../../../../../shared/components/common-audio-uploader/common-audio-uploader.component';
@Component({
  selector: 'app-question-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    EditorModule,
    ToggleSwitchModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DividerModule,
    CardModule,
    DialogModule,
    MessageModule,
    AppQuestionBuilderTranslationComponent,
    AppQuestionBuilderAnswerComponent,
    CommonImageUploaderComponent,
    CommonAudioUploaderComponent  ],
  templateUrl: './question-builder.component.html',
  styleUrl: './question-builder.component.scss'
})
export class QuestionBuilderComponent {

  // 📦 Estado Principal
  question: QuestionModel = { ...defaultQuestion };
  mediaTypes = [...QUESTION_MEDIA_TYPES];
  mediaPositions = [...MEDIA_POSITIONS];
  editorStyle = QUESTION_EDITOR_STYLE;
  questionTypes  = QUESTION_TYPES;

  selectedMediaType: 'image' | 'video' | 'audio' | null = null;
  mediaPosition: string = 'left';
  uploadedFiles: any[] = [];

  showTranslation = false;
  showWordModal = false;

  wordBreakdown: WordModel[] = [];
  tempWordBreakdown: WordModel[] = [];
  expandedWordIds: Set<number> = new Set();
  textHasChanged = false;

  constructor(
    private store: Store,
    private notification: NotificationService
  ) {}

  // ⚡ Getters
  get mediaAcceptType(): string {
    switch (this.selectedMediaType) {
      case 'image': return 'image/*';
      case 'video': return 'video/*';
      case 'audio': return 'audio/*';
      default: return '*/*';
    }
  }

  getTranslationText(): string {
    return this.question.translations?.find(t => t.languageCode === DEFAULT_TARGET_LANG)?.translatedText || '';
  }

  // 🛠️ Funciones Generales
  updateField<K extends keyof QuestionModel>(field: K, value: QuestionModel[K]) {
    this.question = {
      ...this.question,
      [field]: value
    };
    this.updateState();
  }

  updateState() {
    this.store.dispatch(updateActivity({ changes: { question: this.question } }));
  }

  // 🎥 Funciones Media (imagen, audio, video)
  toggleMediaType(type: 'image' | 'video' | 'audio') {
    this.selectedMediaType = type;
    this.mediaPosition = 'top';

    const filteredMedia = (this.question.media ?? []).filter(
      m => !['image', 'video', 'audio'].includes(m.type)
    );

    this.question = {
      ...this.question,
      media: [...filteredMedia] // 👈 importante clonar
    };

    this.updateState();
  }

  clearMedia() {
    this.selectedMediaType = null;
    this.question.media = [];
    this.updateState();
  }

  onUpload(event: any) {
    if (!this.selectedMediaType) return;

    const file = event.files[0];
    const newMedia: MediaModel = {
      type: this.selectedMediaType,
      url: 'https://www.primefaces.org/cdn/api/' + file.name,
      position: this.mediaPosition
    };

    this.question = {
      ...this.question,
      media: [newMedia]
    };

    this.updateState();
    this.notification.showSuccess('Archivo subido correctamente');
  }

  onQuestionTypeChange(type: QuestionType) {
    this.question = { ...this.question, type };
    this.updateState();
  }

  onFileSelect(files: File[]) {
    this.uploadedFiles = files;
    if (!this.selectedMediaType || !files.length) return;
    this.onUpload({ files });
  }

  onClearUpload() {
    this.uploadedFiles = [];
    this.question = {
      ...this.question,
      media: []
    };
    this.updateState();
  }

  onMediaPositionChange(newPosition: string) {
    this.mediaPosition = newPosition;

    const updatedMedia = this.question.media?.map(m => ({ ...m, position: newPosition })) ?? [];

    this.question = {
      ...this.question,
      media: updatedMedia
    };

    this.updateState();
  }

  // 📝 Funciones Traducción General
  updateTranslation(value: string) {
    const originalTranslations = this.question.translations ?? [];
    const translations = [...originalTranslations]; // 👈 Clonamos el array primero

    const idx = translations.findIndex(t => t.languageCode === DEFAULT_TARGET_LANG);

    if (idx >= 0) {
      translations[idx] = { ...translations[idx], translatedText: value };
    } else {
      translations.push({
        languageCode: DEFAULT_TARGET_LANG,
        translatedText: value,
        explanation: '',
        media: []
      });
    }

    this.question = {
      ...this.question,
      translations: translations
    };

    this.updateState();
  }

  // 🔤 Funciones Traducción Palabra por Palabra (Modal)
  openWordTranslationModal() {
    if (!this.wordBreakdown.length) {
      this.generateWordBreakdown();
    }
    this.tempWordBreakdown = JSON.parse(JSON.stringify(this.wordBreakdown));
    this.checkTextChange();
    this.showWordModal = true;
  }

  saveWordTranslation() {
    this.wordBreakdown = [...this.tempWordBreakdown];
    this.question = {
      ...this.question,
      wordBreakdown: [...this.wordBreakdown]
    };
    this.updateState();
    this.showWordModal = false;
  }

  onSaveWordTranslation(newWordBreakdown: WordModel[]) {
    this.wordBreakdown = [...newWordBreakdown];
    this.tempWordBreakdown = [...newWordBreakdown];

    this.question = {
      ...this.question,
      wordBreakdown: [...newWordBreakdown]
    };

    this.updateState();
    this.showWordModal = false;
  }

  cancelWordTranslation() {
    this.showWordModal = false;
  }

  regenerateWordBreakdown() {
    const plainText = this.stripHtml(this.question.text ?? '');
    const words = plainText.split(/\s+/).filter(Boolean);

    const existingWords = new Map(this.wordBreakdown.map(w => [w.text.toLowerCase(), w]));

    const newWordBreakdown = words.map((word, index) => {
      const existing = existingWords.get(word.toLowerCase());
      return existing ? { ...existing, id: index } : this.createNewWord(word, index);
    });

    this.wordBreakdown = [...newWordBreakdown];
    this.tempWordBreakdown = JSON.parse(JSON.stringify(newWordBreakdown));

    this.question = {
      ...this.question,
      wordBreakdown: [...newWordBreakdown]
    };

    this.textHasChanged = false;
    this.updateState();
  }

  toggleExpandWord(wordId: number) {
    this.expandedWordIds.has(wordId) ? this.expandedWordIds.delete(wordId) : this.expandedWordIds.add(wordId);
  }

  onWordTranslationChange(newValue: string, word: WordModel) {
    const idx = this.tempWordBreakdown.findIndex(w => w.id === word.id);
    if (idx !== -1) {
      this.tempWordBreakdown[idx].translations[0].translatedText = newValue;
    }
  }

  onWordMediaSelect(event: any, word: WordModel) {
    const file = event.files[0];
    const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('audio') ? 'audio' : 'video';
    word.translations[0].media.push({
      type,
      url: 'https://www.primefaces.org/cdn/api/' + file.name
    });
  }

  // 🔧 Utilidades
  private stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || '';
  }

  private checkTextChange() {
    const plainText = this.stripHtml(this.question.text ?? '');
    const currentWords = plainText.split(/\s+/).filter(Boolean);
    const breakdownWords = this.wordBreakdown.map(w => w.text);
    this.textHasChanged = currentWords.join(' ').toLowerCase() !== breakdownWords.join(' ').toLowerCase();
  }

  private generateWordBreakdown() {
    const plainText = this.stripHtml(this.question.text ?? '');
    const words = plainText.split(/\s+/).filter(Boolean);

    const newWordBreakdown = words.map((w, i) => this.createNewWord(w, i));

    this.wordBreakdown = [...newWordBreakdown];
    this.tempWordBreakdown = JSON.parse(JSON.stringify(newWordBreakdown));

    this.question = {
      ...this.question,
      wordBreakdown: [...newWordBreakdown]
    };

    this.updateState();
  }

  private createNewWord(word: string, index: number): WordModel {
    return {
      id: index,
      text: word,
      languageCode: DEFAULT_SOURCE_LANG,
      type: 'word',
      translations: [{
        translatedText: '',
        languageCode: DEFAULT_TARGET_LANG,
        explanation: '',
        media: []
      }]
    };
  }

  onAnswersChange(updatedQuestion: QuestionModel) {
    this.question = { ...updatedQuestion };
    this.updateState();
  }

  getImageUrl(): string | null {
    return this.question.media?.find(m => m.type === 'image')?.url ?? null;
  }
  
  getAudioUrl(): string | null {
    return this.question.media?.find(m => m.type === 'audio')?.url ?? null;
  }
  
  onImageChanged(file: File | null): void {
    const newMedia: MediaModel | null = file
    ? {
        type: 'image',
        url: URL.createObjectURL(file),
        position: this.mediaPosition
      }
    : null;  
    this.updateMedia('image', newMedia);
  }
  
  onAudioChanged(file: File | null): void {
    const newMedia: MediaModel | null = file
  ? {
      type: 'audio',
      url: URL.createObjectURL(file),
      startTime: 0,
      endTime: undefined,
      position: this.mediaPosition
    }
  : null;
  
    this.updateMedia('audio', newMedia);
  }
  
  onAudioRegionChanged(region: { start: number; end: number | null }) {
    const updatedMedia = this.question.media?.map(m => {
      if (m.type === 'audio') {
        return {
          ...m,
          startTime: region.start,
          endTime: region.end ?? undefined
        };
      }
      return m;
    }) ?? [];
  
    this.question = {
      ...this.question,
      media: updatedMedia
    };
  
    this.updateState();
  }
  
  onWaveformReady(): void {
    // Puedes usar esto si necesitas saber cuándo el waveform está cargado
  }

  private updateMedia(type: 'image' | 'audio', media: MediaModel | null): void {
    const otherMedia = (this.question.media ?? []).filter(m => m.type !== type);
    const newMediaList = media ? [...otherMedia, media] : [...otherMedia];
  
    this.question = {
      ...this.question,
      media: newMediaList
    };
  
    this.updateState();
  }
}
