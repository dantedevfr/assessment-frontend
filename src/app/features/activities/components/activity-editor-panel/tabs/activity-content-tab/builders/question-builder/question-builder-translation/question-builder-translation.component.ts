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
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';
import { OrderListModule } from 'primeng/orderlist';
import { Chip } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

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
    AccordionModule,
    CheckboxModule,
    ListboxModule,
    TagModule,
    OrderListModule,
    Chip,
    TooltipModule
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
  @Output() saveWordTranslation = new EventEmitter<WordModel[]>(); // 🔥 Enviamos la nueva lista
  @Output() cancelWordTranslation = new EventEmitter<void>();
  @Output() regenerateWordBreakdown = new EventEmitter<void>();
  @Output() toggleExpandWord = new EventEmitter<number>();
  @Output() wordMediaSelect = new EventEmitter<{ event: any, word: WordModel }>();

  uploadedWordFiles: File[] = [];
  selectedWordIds: number[] = []; // <-- IDs de las palabras seleccionadas para agrupar
  groupedWords: WordModel[] = []; // Nueva lista de palabras seleccionadas
  orderedGroupedWords: WordModel[] = []; // Para reordenar
  selectedWordsForGrouping: WordModel[] = [];
  showGroupingModal = false;
  accordionActiveIndex: number | null = null;
  accordionActiveIndexes: number[] = [];
  accordionActiveValues: any[] = []; // 🔥 Ahora trabajamos con VALUES, no index.

  onTranslationChange(value: string) {
    this.translationTextChange.emit(value);
  }

  onOpenWordTranslation() {
    this.openWordTranslationModal.emit();
  }

  onSaveWordTranslation() {
    this.saveWordTranslation.emit(this.tempWordBreakdown); // 🔥 Emitimos la nueva lista
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

  groupSelectedWords() {
    if (this.selectedWordIds.length < 2) return;

    this.selectedWordsForGrouping = this.tempWordBreakdown
      .filter(word => this.selectedWordIds.includes(word.id))
      .sort((a, b) => a.id - b.id);

    this.showGroupingModal = true;
  }

  confirmGrouping() {
    const combinedText = this.selectedWordsForGrouping.map(w => w.text).join(' ');

    const newGroup: WordModel = {
      id: Date.now(),
      text: combinedText,
      languageCode: this.selectedWordsForGrouping[0].languageCode,
      type: 'phrase',
      translations: [{
        translatedText: '',
        languageCode: this.selectedWordsForGrouping[0].translations[0]?.languageCode ?? 'es',
        explanation: '',
        media: []
      }]
    };

    // Eliminar seleccionadas
    const idsToRemove = this.selectedWordsForGrouping.map(w => w.id);
    this.tempWordBreakdown = this.tempWordBreakdown.filter(w => !idsToRemove.includes(w.id));

    // Insertar el nuevo grupo en el lugar del primer elemento seleccionado
    const insertIndex = Math.min(...this.selectedWordsForGrouping.map(w => w.id));
    this.tempWordBreakdown.splice(insertIndex, 0, newGroup);

    // Limpiar
    this.selectedWordIds = [];
    this.selectedWordsForGrouping = [];
    this.showGroupingModal = false;
  }

  // 🆕 FUNCIÓN PARA DESAGRUPAR
  ungroupWord(word: WordModel) {
    if (word.type !== 'phrase') return;

    const parts = word.text.split(/\s+/).filter(Boolean);

    const newWords: WordModel[] = parts.map((p, idx) => ({
      id: Date.now() + idx, // Usamos Date.now para IDs únicos rápidos (o tu sistema de IDs)
      text: p,
      languageCode: word.languageCode,
      type: 'word',
      translations: [{
        translatedText: '',
        languageCode: word.translations[0]?.languageCode ?? 'es',
        explanation: '',
        media: []
      }]
    }));

    // Encuentra el índice del phrase
    const index = this.tempWordBreakdown.findIndex(w => w.id === word.id);

    if (index !== -1) {
      // 🔥 Reemplaza el phrase en su misma posición por las nuevas palabras
      this.tempWordBreakdown.splice(index, 1, ...newWords);
    }
  }

  onCreatePhrase() {
    const orderedText = this.orderedGroupedWords.map(w => w.text).join(' ');
    const phrase: WordModel = {
      id: Date.now(),
      text: orderedText,
      languageCode: 'en',
      type: 'phrase',
      translations: [{ translatedText: '', languageCode: 'es', explanation: '', media: [] }]
    };
    this.tempWordBreakdown.push(phrase);
    this.groupedWords = [];
    this.orderedGroupedWords = [];
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

playAudio(word: WordModel) {
  const audio = new Audio(word.translations[0].media.find(m => m.type === 'audio')?.url);
  audio.play();
}

pauseAudio(word: WordModel) {
  const audio = new Audio(word.translations[0].media.find(m => m.type === 'audio')?.url);
  audio.pause();
}

hasAudio(word: WordModel): boolean {
  return !!word.translations[0].media.find(m => m.type === 'audio');
}

onSelectWordAudio(event: any, word: WordModel) {
  const file = event.files[0];
  word.translations[0].media = [{
    type: 'audio',
    url: URL.createObjectURL(file),
  }];
}





// 🔥 Bloquea que el header abra/cierre
onHeaderClick(event: MouseEvent) {
  console.log(event);

  event.preventDefault();
  event.stopPropagation();
}

// 🔥 Solo el botón + maneja abrir/cerrar
toggleAccordion(value: any, event: MouseEvent) {
  event.stopPropagation();
  const idx = this.accordionActiveValues.indexOf(value);
  if (idx !== -1) {
    this.accordionActiveValues.splice(idx, 1); // Cierra
  } else {
    this.accordionActiveValues.push(value); // Abre
  }
  this.accordionActiveValues = [...this.accordionActiveValues]; // 💥 Angular necesita la referencia nueva para detectar cambios
}

onSelectWordImage(event: any, word: WordModel) {
  const file = event.files[0];
  if (file) {
    word.translations[0].media = [
      {
        type: 'image',
        url: URL.createObjectURL(file),
      },
    ];
  }
}

getWordImageUrl(word: WordModel): string | null {
  const image = word.translations[0].media?.find((m) => m.type === 'image');
  return image ? image.url : null;
}


}
