import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MediaModel } from '../../../../../../../models/media.model';
import { WaveformService } from '../../../../../../../services/waveform.service';

@Component({
  selector: 'app-question-builder-answer-advanced',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    FileUploadModule,
    InputTextModule
  ],
  templateUrl: './answer-advanced.component.html'
})
export class QuestionBuilderAnswerAdvancedComponent implements AfterViewInit {
  @Input() visible: boolean = false;
  @Input() initialTranslation: string = '';
  @Input() initialMedia: MediaModel[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<{
    translation: string;
    media: MediaModel[];
  }>();

  @ViewChild('waveformContainerRef') waveformContainerRef!: ElementRef;

  translation: string = '';
  imageUrl: string | null = null;
  audioUrl: string | null = null;
  audioStart: number = 0;
  audioEnd: number | null = null;

  isPlaying = false;

  private readonly audioId = 0; // ✅ Usamos un ID numérico constante

  constructor(private waveformService: WaveformService) {}

  ngAfterViewInit() {
    this.setupWaveform();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialTranslation']) {
      this.translation = this.initialTranslation;
    }

    if (changes['initialMedia']) {
      const image = this.initialMedia.find(m => m.type === 'image');
      const audio = this.initialMedia.find(m => m.type === 'audio');

      this.imageUrl = image?.url ?? null;
      this.audioUrl = audio?.url ?? null;
      this.audioStart = audio?.startTime ?? 0;
      this.audioEnd = audio?.endTime ?? null;

      this.setupWaveform();
    }
  }

  setupWaveform() {
    if (this.audioUrl && this.waveformContainerRef) {
      setTimeout(() => {
        this.waveformService.createWaveform(
          this.waveformContainerRef.nativeElement,
          this.audioUrl!,
          this.audioId,
          this.audioStart,
          this.audioEnd ?? undefined
        );
      }, 300);
    }
  }

  togglePlay() {
    this.isPlaying = this.waveformService.togglePlay(this.audioId, () => {
      this.isPlaying = false;
    });
  }

  onCancel(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave(): void {
    const region = this.waveformService.getRegion(this.audioId);

    const media: MediaModel[] = [];

    if (this.imageUrl) {
      media.push({ type: 'image', url: this.imageUrl });
    }

    if (this.audioUrl) {
      media.push({
        type: 'audio',
        url: this.audioUrl,
        startTime: region?.start ?? this.audioStart,
        endTime: region?.end ?? this.audioEnd ?? undefined
      });
    }

    this.save.emit({
      translation: this.translation,
      media
    });

    this.visible = false;
    this.visibleChange.emit(false);
  }

  onImageSelect(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  onAudioSelect(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.audioUrl = URL.createObjectURL(file);
      this.audioStart = 0;
      this.audioEnd = null;

      this.setupWaveform();
    }
  }
}
