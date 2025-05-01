import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MediaModel } from '../../../../../../../models/media.model';
import { WaveformService } from '../../../../../../../services/waveform.service';
import { CommonImageUploaderComponent } from '../../../../../../../../../shared/components/common-image-uploader/common-image-uploader.component';
import { CommonAudioUploaderComponent } from '../../../../../../../../../shared/components/common-audio-uploader/common-audio-uploader.component';

@Component({
  selector: 'app-question-builder-answer-advanced',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    FileUploadModule,
    InputTextModule,
    CommonImageUploaderComponent,
    CommonAudioUploaderComponent
  ],
  templateUrl: './answer-advanced.component.html'
})
export class QuestionBuilderAnswerAdvancedComponent implements AfterViewInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() initialTranslation: string = '';
  @Input() initialMedia: MediaModel[] = [];
  @ViewChild(CommonAudioUploaderComponent) audioUploaderRef!: CommonAudioUploaderComponent;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<{
    translation: string;
    media: MediaModel[];
  }>();

  translation: string = '';
  imageUrl: string | null = null;
  audioUrl: string | null = null;
  audioStart: number = 0;
  audioEnd: number | null = null;
  isWaveformReady = false;

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.isWaveformReady = false; // 👈 importante
  
      if (this.initialTranslation) {
        this.translation = this.initialTranslation;
      }
  
      if (this.initialMedia) {
        const image = this.initialMedia.find(m => m.type === 'image');
        const audio = this.initialMedia.find(m => m.type === 'audio');
  
        this.imageUrl = image?.url ?? null;
        this.audioUrl = audio?.url ?? null;
        this.audioStart = audio?.startTime ?? 0;
        this.audioEnd = audio?.endTime ?? null;
      }
    }
  }
  onWaveformReady(): void {
    this.isWaveformReady = true;
  }
  onCancel(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave(): void {
    const media: MediaModel[] = [];
  
    const region = this.audioUploaderRef?.getRegion();
  
    if (this.imageUrl) {
      media.push({ type: 'image', url: this.imageUrl });
    }
  
    if (this.audioUrl) {
      media.push({
        type: 'audio',
        url: this.audioUrl,
        startTime: region?.start ?? 0,
        endTime: region?.end ?? undefined
      });
    }
  
    this.save.emit({
      translation: this.translation,
      media
    });
  
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onImageChanged(file: File | null): void {
    this.imageUrl = file ? URL.createObjectURL(file) : null;
  }

  onAudioChanged(file: File | null): void {
    this.audioUrl = file ? URL.createObjectURL(file) : null;
    this.audioStart = 0;
    this.audioEnd = null;
  }

  onRegionChanged(region: { start: number; end: number | null }): void {
    this.audioStart = region.start;
    this.audioEnd = region.end;
  }
}