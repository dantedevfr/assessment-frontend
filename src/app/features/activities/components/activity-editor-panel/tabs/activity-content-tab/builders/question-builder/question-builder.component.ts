import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MediaModel } from '../../../../../../models/media.model';
import { QuestionModel } from '../../../../../../models/question.model'; // ajusta la ruta si es necesario
import { NotificationService } from '../../../../../../../../core/services/notification.service'; // ajusta si cambia
import { EditorModule } from 'primeng/editor';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Dialog } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';


import { QUESTION_MEDIA_TYPES,
  DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG,
  QUESTION_EDITOR_STYLE,
  MEDIA_POSITIONS  } from './../../../../../../config/question.config';
  import { SelectModule } from 'primeng/select';
  import { Store } from '@ngrx/store';
import { updateActivity } from '../../../../../../state';
import { defaultQuestion } from '../../../../../../state';
import { FileUpload } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { WordModel } from '../../../../../../models/word.model';
@Component({
  selector: 'app-question-builder',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    EditorModule,
    ToggleSwitchModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    FileUpload,
    DividerModule,
    CardModule,
    Dialog,
    MessageModule],
  templateUrl: './question-builder.component.html',
  styleUrl: './question-builder.component.scss'
})
export class QuestionBuilderComponent {

  question: QuestionModel = { ...defaultQuestion };
  mediaTypes = [...QUESTION_MEDIA_TYPES];
  mediaPositions = [...MEDIA_POSITIONS];
  editorStyle = QUESTION_EDITOR_STYLE;
  mediaPosition: string = 'left';
  selectedMediaType: 'image' | 'video' | 'audio' | null = null;
  showTranslation = false;
  uploadedFiles: any[] = [];
  showWordTranslation = false;

  showWordModal = false; // 👈 para mostrar el modal
  tempWordBreakdown: WordModel[] = []; // 👈 edición temporal antes de guardar
  wordBreakdown: WordModel[] = [];
  textHasChanged = false;
  expandedWordIds: Set<number> = new Set();

  constructor(
    private store: Store,
    private notification: NotificationService
  ) {}

  get mediaAcceptType(): string {
    switch (this.selectedMediaType) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';
      default:
        return '*/*';
    }
  }

  toggleMediaType(type: 'image' | 'video' | 'audio') {
    this.selectedMediaType = type;
    this.mediaPosition = 'top';

    const filteredMedia = (this.question.media ?? []).filter(
      m => !['image', 'video', 'audio'].includes(m.type)
    );

    this.question = {
      ...this.question,
      media: filteredMedia
    };

    this.updateState();
  }

  clearMedia() {
    this.selectedMediaType = null;

    this.question = {
      ...this.question,
      media: []
    };

    this.updateState();
  }

  onUpload(event: any) {
    if (!this.selectedMediaType) return;

    const file = event.files[0];
    const fakeUrl = 'https://www.primefaces.org/cdn/api/' + file.name;

    const newMedia: MediaModel = {
      type: this.selectedMediaType,
      url: fakeUrl,
      position: this.mediaPosition
    };

    this.question = {
      ...this.question,
      media: [newMedia]
    };

    this.updateState();
    this.notification.showSuccess('Archivo subido correctamente');
  }

  uploadManually(fu: any) {
    fu.upload();
  }

  updateField<K extends keyof QuestionModel>(field: K, value: QuestionModel[K]) {
    this.question = {
      ...this.question,
      [field]: value
    };
    this.updateState();
  }

  updateTranslation(value: string) { 
    const translationList = this.question.translations ?? [];
    
    const updatedList = translationList.map(t => {
      if (t.languageCode === DEFAULT_TARGET_LANG) {
        return { ...t, translatedText: value };
      }
      return t;
    });
  
    const exists = updatedList.some(t => t.languageCode === DEFAULT_TARGET_LANG);
  
    if (!exists) {
      updatedList.push({
        languageCode: DEFAULT_TARGET_LANG, 
        translatedText: value,
        explanation: '',
        media: []
      });
    }
  
    this.question = {
      ...this.question,
      translations: updatedList
    };
  
    this.updateState();
  }

  onFileSelect(files: File[]) {
    this.uploadedFiles = files;

    if (!this.selectedMediaType || !files.length) return;

    const file = files[0];
    const fakeUrl = 'https://www.primefaces.org/cdn/api/' + file.name;

    const newMedia: MediaModel = {
      type: this.selectedMediaType,
      url: fakeUrl,
      position: this.mediaPosition
    };

    this.question = {
      ...this.question,
      media: [newMedia]
    };

    this.updateState();
  }

  onMediaPositionChange(newPosition: string) {
    this.mediaPosition = newPosition;

    const updatedMedia = this.question.media?.map(m => ({
      ...m,
      position: newPosition
    })) ?? [];

    this.question = {
      ...this.question,
      media: updatedMedia
    };

    this.updateState();
  }

  onClearUpload() {
    this.uploadedFiles = [];

    this.question = {
      ...this.question,
      media: []
    };

    this.updateState();
  }

  generateWordBreakdown() {
    console.log("change");

    const plainText = this.stripHtml(this.question.text ?? '');
    console.log(plainText);

    const words = plainText.split(/\s+/).filter(Boolean);
    console.log(words);

    this.wordBreakdown = words.map((w, i) => ({
      id: i,
      text: w,
      languageCode: DEFAULT_SOURCE_LANG,
      type: 'word',
      translations: [
        {
          translatedText: '',
          languageCode: DEFAULT_TARGET_LANG,
          explanation: '',
          media: []
        }
      ]
    }));

    console.log(this.wordBreakdown);

  }

  updateWordTranslation(word: WordModel) {
    // Si quieres guardar el state en tiempo real:
    this.question.wordBreakdown = this.wordBreakdown;
    this.updateState();
  }

  onWordMediaUpload(event: any, word: WordModel) {
    const file = event.files[0];
    const fakeUrl = 'https://www.primefaces.org/cdn/api/' + file.name;
  
    if (word.translations && word.translations.length > 0) {
      const firstTranslation = word.translations[0];
  
      if (!firstTranslation.media) {
        firstTranslation.media = [];
      }
  
      firstTranslation.media.push({
        type: 'audio',
        url: fakeUrl
      });
    }
  
    this.question.wordBreakdown = this.wordBreakdown;
    this.updateState();
  }

  getTranslationText(): string {
    const t = this.question.translations?.find(tr => tr.languageCode === DEFAULT_TARGET_LANG);
    return t?.translatedText || '';
  }

  getWordTranslation(word: WordModel): string {
    const t = word.translations?.find(tr => tr.languageCode === DEFAULT_TARGET_LANG);
    return t?.translatedText || '';
  }
  
  onWordTranslationChange(newValue: string, word: WordModel) {
    const idx = this.tempWordBreakdown.findIndex(w => w.id === word.id);
    if (idx !== -1) {
      const updatedWord: WordModel = {
        ...this.tempWordBreakdown[idx],
        translations: [{
          ...this.tempWordBreakdown[idx].translations?.[0],
          translatedText: newValue
        }]
      };
      // 🔥 Importantísimo: debes reemplazar el objeto completo en el array
      this.tempWordBreakdown = [
        ...this.tempWordBreakdown.slice(0, idx),
        updatedWord,
        ...this.tempWordBreakdown.slice(idx + 1)
      ];
    }
  }

  // 📦 Método para abrir el modal
  openWordTranslationModal() {
    if (!this.wordBreakdown.length) {
      const plainText = this.stripHtml(this.question.text ?? '');
      const words = plainText.split(/\s+/).filter(Boolean);
    
      this.wordBreakdown = words.map((w, i) => ({
        id: i,
        text: w,
        languageCode: DEFAULT_SOURCE_LANG,
        type: 'word',
        translations: [{
          translatedText: '',
          languageCode: DEFAULT_TARGET_LANG,
          explanation: '',
          media: []
        }]
      }));
    
      this.question = {
        ...this.question,
        wordBreakdown: [...this.wordBreakdown]
      };
      this.updateState();
    }
  
    // ✅ Clona para que puedas mutar libremente en el modal
    this.tempWordBreakdown = JSON.parse(JSON.stringify(this.wordBreakdown));
  
    this.checkTextChange();
    this.showWordModal = true;
  }

  // ✅ Método para guardar cambios del modal
  saveWordTranslation() {
    this.wordBreakdown = [...this.tempWordBreakdown];
  
    this.question = {
      ...this.question,
      wordBreakdown: [...this.wordBreakdown]
    };
  
    this.updateState();
    this.showWordModal = false;
  }

  // ❌ Método para cancelar cambios
  cancelWordTranslation() {
    this.showWordModal = false;
  }

  // 🔥 Regenerar inteligentemente
  regenerateWordBreakdown() {
    const plainText = this.stripHtml(this.question.text ?? '');
    const words = plainText.split(/\s+/).filter(Boolean);
    
    const existingWords = new Map(this.wordBreakdown.map(w => [w.text.toLowerCase(), w]));
  
    this.wordBreakdown = words.map((word, index) => {
      const existing = existingWords.get(word.toLowerCase());
      if (existing) {
        return { ...existing, id: index };
      }
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
    });
  
    this.question = {
      ...this.question,
      wordBreakdown: [...this.wordBreakdown]
    };
  
    // ✅ Importante: también actualizar el TEMPORAL
    this.tempWordBreakdown = JSON.parse(JSON.stringify(this.wordBreakdown));
  
    this.updateState();
    this.textHasChanged = false; // 🔥 Ya regeneraste, ya no hay cambios
  }

  // 🔥 Util
  stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || '';
  }

  updateState() {
    this.store.dispatch(
      updateActivity({
        changes: { question: this.question }
      })
    );
  }
  getFirstTranslation(word: WordModel) {
    return word.translations?.[0] ?? { translatedText: '' };
  }

  checkTextChange() {
    const plainText = this.stripHtml(this.question.text ?? '');
    const currentWords = plainText.split(/\s+/).filter(Boolean);
  
    const breakdownWords = this.wordBreakdown.map(w => w.text);
  
    this.textHasChanged = currentWords.join(' ').toLowerCase() !== breakdownWords.join(' ').toLowerCase();
  }

  toggleExpandWord(wordId: number) {
    if (this.expandedWordIds.has(wordId)) {
      this.expandedWordIds.delete(wordId);
    } else {
      this.expandedWordIds.add(wordId);
    }
  }

  onWordMediaSelect(event: any, word: WordModel) {
    const file = event.files[0];
    const fakeUrl = 'https://www.primefaces.org/cdn/api/' + file.name; // solo preview fake
    
    const type = file.type.startsWith('image')
      ? 'image'
      : file.type.startsWith('audio')
      ? 'audio'
      : 'video';
  
    word.translations[0].media.push({
      type,
      url: fakeUrl
    });
  }
}
