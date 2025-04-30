import { Component, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
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
import { SliderModule } from 'primeng/slider';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/plugins/regions'; // 🛑 sin `.js` al final si usas Typescript
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WaveformService } from '../../../../../../../services/waveform.service';
import { getAudioMedia,getImageMedia } from '../../../../../../../utils/audio-utils';
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
    TooltipModule,
    SliderModule
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
  @Output() saveWordTranslation = new EventEmitter<WordModel[]>();
  @Output() cancelWordTranslation = new EventEmitter<void>();
  @Output() regenerateWordBreakdown = new EventEmitter<void>();
  @Output() toggleExpandWord = new EventEmitter<number>();
  @Output() wordMediaSelect = new EventEmitter<{ event: any, word: WordModel }>();

  @ViewChildren('waveformContainerRef') waveformContainers!: QueryList<ElementRef>;

  isPlaying: { [wordId: number]: boolean } = {};
  selectedWordIds: number[] = [];
  groupedWords: WordModel[] = [];
  orderedGroupedWords: WordModel[] = [];
  selectedWordsForGrouping: WordModel[] = [];
  showGroupingModal = false;
  accordionActiveValues: any[] = [];

  constructor(private waveformService: WaveformService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.tempWordBreakdown.forEach(word => {
        const container = this.getWaveformContainerForWord(word.id);
        const audio = getAudioMedia(word.translations[0].media);
        if (container && audio?.url) {
          this.waveformService.createWaveform(container, audio.url, word.id, audio.startTime ?? 0, audio.endTime);
        }
      });
    });
  }

  getWaveformContainerForWord(wordId: number): HTMLElement | null {
    const match = this.waveformContainers.find(el => el.nativeElement.id === 'waveform-' + wordId);
    return match?.nativeElement || null;
  }

  onTranslationChange(value: string) {
    this.translationTextChange.emit(value);
  }

  onOpenWordTranslation() {
    this.openWordTranslationModal.emit();
    setTimeout(() => {
      this.tempWordBreakdown.forEach(word => {
        const container = this.getWaveformContainerForWord(word.id);
        const audio = getAudioMedia(word.translations[0].media);
        if (container && audio?.url) {
          this.waveformService.createWaveform(container, audio.url, word.id, audio.startTime ?? 0, audio.endTime);
        }
      });
    }, 300);
  }

  onSaveWordTranslation() {
    this.tempWordBreakdown.forEach(word => {
      const audio = getAudioMedia(word.translations[0].media);
      const region = this.waveformService.getRegion(word.id);
      if (audio && region) {
        audio.startTime = region.start;
        audio.endTime = region.end;
      }
    });
    this.saveWordTranslation.emit(this.tempWordBreakdown);
  }

  onCancelWordTranslation() {
    this.cancelWordTranslation.emit();
  }

  onRegenerateWords() {
    this.regenerateWordBreakdown.emit();
  }

  toggleAccordion(value: any, event: MouseEvent) {
    event.stopPropagation();
    const idx = this.accordionActiveValues.indexOf(value);
    if (idx !== -1) {
      this.accordionActiveValues.splice(idx, 1);
    } else {
      this.accordionActiveValues.push(value);
    }
    this.accordionActiveValues = [...this.accordionActiveValues];
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

  togglePlay(wordId: number) {
    this.isPlaying[wordId] = this.waveformService.togglePlay(wordId, () => {
      this.isPlaying[wordId] = false;
    });
  }

  onSelectWordAudio(event: any, word: WordModel) {
    const file = event.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    word.translations[0].media = word.translations[0].media.filter(m => m.type !== 'audio');
    word.translations[0].media.push({ type: 'audio', url });

    const container = this.getWaveformContainerForWord(word.id);
    if (container) {
      this.waveformService.createWaveform(container, url, word.id);
    }
  }

  onSelectWordImage(event: any, word: WordModel) {
    const file = event.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    word.translations[0].media = word.translations[0].media.filter(m => m.type !== 'image');
    word.translations[0].media.push({ type: 'image', url });
  }

  getWordImageUrl(word: WordModel): string | null {
    const image = getImageMedia(word.translations[0].media);
    return image ? image.url : null;
  }

  hasAudio(word: WordModel): boolean {
    return !!getAudioMedia(word.translations[0].media);
  }

  groupSelectedWords() {
    if (this.selectedWordIds.length < 2) return;
    this.selectedWordsForGrouping = this.tempWordBreakdown
      .filter(w => this.selectedWordIds.includes(w.id))
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

    const idsToRemove = this.selectedWordsForGrouping.map(w => w.id);
    this.tempWordBreakdown = this.tempWordBreakdown.filter(w => !idsToRemove.includes(w.id));
    const insertIndex = Math.min(...this.selectedWordsForGrouping.map(w => w.id));
    this.tempWordBreakdown.splice(insertIndex, 0, newGroup);

    this.selectedWordIds = [];
    this.selectedWordsForGrouping = [];
    this.showGroupingModal = false;
  }

  ungroupWord(word: WordModel) {
    if (word.type !== 'phrase') return;

    const parts = word.text.split(/\s+/).filter(Boolean);
    const newWords: WordModel[] = parts.map((p, idx) => ({
      id: Date.now() + idx,
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

    const index = this.tempWordBreakdown.findIndex(w => w.id === word.id);
    if (index !== -1) {
      this.tempWordBreakdown.splice(index, 1, ...newWords);
    }
  }

  /*@Input() showTranslation = false;
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
  @ViewChildren('waveformContainerRef') waveformContainers!: QueryList<ElementRef>;

  waveSurfers: { [wordId: number]: WaveSurfer } = {};
  regionsPlugins: { [wordId: number]: ReturnType<typeof RegionsPlugin.create> } = {};

  uploadedWordFiles: File[] = [];
  selectedWordIds: number[] = []; // <-- IDs de las palabras seleccionadas para agrupar
  groupedWords: WordModel[] = []; // Nueva lista de palabras seleccionadas
  orderedGroupedWords: WordModel[] = []; // Para reordenar
  selectedWordsForGrouping: WordModel[] = [];
  showGroupingModal = false;
  accordionActiveIndex: number | null = null;
  accordionActiveIndexes: number[] = [];
  accordionActiveValues: any[] = []; // 🔥 Ahora trabajamos con VALUES, no index.
  isPlaying: { [wordId: number]: boolean } = {};

  onTranslationChange(value: string) {
    this.translationTextChange.emit(value);
  }

  onOpenWordTranslation() {
    this.openWordTranslationModal.emit();

    // Dale un poco de tiempo al DOM para montar los elementos
    setTimeout(() => {
      this.tempWordBreakdown.forEach(word => {
        const audio = this.getAudioMedia(word);
        if (audio?.url) {
          this.initWaveSurferForWordFromUrl(word, audio.url);
        }
      });
    }, 300); // puedes ajustar si es necesario
  }

  onSaveWordTranslation() {
    // 🔄 Sync regions → word.media
    this.tempWordBreakdown.forEach(word => {
      const audio = this.getAudioMedia(word);
      const region = this.regionsPlugins[word.id]?.getRegions()?.[0];

      if (audio && region) {
        audio.startTime = region.start;
        audio.endTime = region.end;
      }
    });

    // ✅ Ahora sí emite el modelo actualizado
    this.saveWordTranslation.emit(this.tempWordBreakdown);
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
  if (!file) return;

  word.translations[0].media = word.translations[0].media.filter(m => m.type !== 'audio');
  const url = URL.createObjectURL(file);

  word.translations[0].media.push({
    type: 'audio',
    url,
  });

  this.initWaveSurferForWord(word, file); // ✅ Carga individual por palabra
}



getWordAudioUrl(word: WordModel): string | null {
  const audio = word.translations[0].media.find(m => m.type === 'audio');
  return audio ? audio.url : null;
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
    // Elimina imágenes anteriores
    word.translations[0].media = word.translations[0].media.filter(m => m.type !== 'image');

    word.translations[0].media.push({
      type: 'image',
      url: URL.createObjectURL(file),
    });
  }
}

getWordImageUrl(word: WordModel): string | null {
  const image = word.translations[0].media?.find((m) => m.type === 'image');
  return image ? image.url : null;
}

audioDurations: { [wordId: number]: number } = {};

// ⚡ Cuando el audio se carga, setea duración y valores iniciales
onLoadedMetadata(event: Event, word: WordModel) {
  const audioPlayer = event.target as HTMLAudioElement;
  if (audioPlayer?.duration) {
    this.audioDurations[word.id] = audioPlayer.duration;

    const audio = word.translations[0].media.find(m => m.type === 'audio');
    if (audio) {
      audio.startTime ??= 0;
      audio.endTime ??= audioPlayer.duration;
    }
  }
}

// ⚡ Cuando el usuario mueve el slider
onAudioRangeChange(event: number[], word: WordModel) {
  const audio = word.translations[0].media.find(m => m.type === 'audio');
  if (audio) {
    audio.startTime = event[0];
    audio.endTime = event[1];
  }
}

getAudioMedia(word: WordModel) {
  return word.translations[0]?.media.find(m => m.type === 'audio') || null;
}

initWaveSurferForWord(word: WordModel, file: File) {
  const audioUrl = URL.createObjectURL(file);
  const container = this.getWaveformContainerForWord(word.id);

  if (!container) {
    // Intenta nuevamente después de que el DOM esté disponible
    setTimeout(() => this.initWaveSurferForWord(word, file), 100);
    return;
  }

  // Limpia anterior
  this.waveSurfers[word.id]?.destroy();

  const waveSurfer = WaveSurfer.create({
    container,
    waveColor: '#A0AEC0',
    progressColor: '#3182CE',
    height: 80,
  });

  const regionsPlugin = RegionsPlugin.create();
  waveSurfer.registerPlugin(regionsPlugin);
  waveSurfer.load(audioUrl);

  waveSurfer.once('ready', () => {
    const duration = waveSurfer.getDuration();

    const audio = word.translations[0].media.find(m => m.type === 'audio');

    // Usa valores guardados o valores por defecto
    const start = audio?.startTime ?? 0;
    const end = audio?.endTime ?? duration;

    // Crea la región visible
    regionsPlugin.addRegion({
      start,
      end,
      color: 'rgba(0, 123, 255, 0.1)',
    });

    // Guarda las referencias
    this.waveSurfers[word.id] = waveSurfer;
    this.regionsPlugins[word.id] = regionsPlugin;

    // Asegura que el modelo también esté actualizado
    if (audio) {
      audio.startTime = start;
      audio.endTime = end;
    }
  });

  // Evento de actualización de región
  regionsPlugin.on('region-updated', (region) => {
    const audio = word.translations[0].media.find(m => m.type === 'audio');
    if (audio) {
      audio.startTime = region.start;
      audio.endTime = region.end;
    }
  });
}


seekToStart(wordId: number) {
  this.waveSurfers[wordId]?.seekTo(0);
}

playRegion(wordId: number) {
  const region = this.regionsPlugins[wordId]?.getRegions()?.[0]; // ✅ Solo una región por palabra
  if (region) {
    this.waveSurfers[wordId]?.play(region.start, region.end);
  }
}

getWaveformContainerForWord(wordId: number): HTMLElement | null {
  const match = this.waveformContainers.find(el =>
    el.nativeElement.id === 'waveform-' + wordId
  );
  return match?.nativeElement || null;
}

togglePlay(wordId: number) {
  const wave = this.waveSurfers[wordId];
  const region = this.regionsPlugins[wordId]?.getRegions()?.[0];

  if (!wave) return;

  if (this.isPlaying[wordId]) {
    wave.pause();
    this.isPlaying[wordId] = false;
  } else {
    if (region) {
      wave.play(region.start, region.end);
    } else {
      wave.play(); // 🔁 fallback si no hay región
    }
    this.isPlaying[wordId] = true;

    // 🛑 Marcar como "no playing" al terminar la reproducción
    wave.once('finish', () => {
      this.isPlaying[wordId] = false;
    });
  }
}

ngAfterViewInit() {
  setTimeout(() => {
    this.tempWordBreakdown.forEach(word => {
      const audio = this.getAudioMedia(word);
      if (audio?.url) {
        this.initWaveSurferForWordFromUrl(word, audio.url);
      }
    });
  });
}

initWaveSurferForWordFromUrl(word: WordModel, audioUrl: string) {
  const container = this.getWaveformContainerForWord(word.id);
  if (!container) {
    setTimeout(() => this.initWaveSurferForWordFromUrl(word, audioUrl), 100);
    return;
  }

  this.waveSurfers[word.id]?.destroy(); // limpia anterior

  const waveSurfer = WaveSurfer.create({
    container,
    waveColor: '#A0AEC0',
    progressColor: '#3182CE',
    height: 80,
  });

  const regionsPlugin = RegionsPlugin.create();
  waveSurfer.registerPlugin(regionsPlugin);
  waveSurfer.load(audioUrl);

  waveSurfer.once('ready', () => {
    const duration = waveSurfer.getDuration();
    const audio = word.translations[0].media.find(m => m.type === 'audio');

    const start = audio?.startTime ?? 0;
    const end = audio?.endTime ?? duration;

    regionsPlugin.addRegion({
      start,
      end,
      color: 'rgba(0, 123, 255, 0.1)',
    });

    this.waveSurfers[word.id] = waveSurfer;
    this.regionsPlugins[word.id] = regionsPlugin;
  });
}*/

}
