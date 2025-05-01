import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { WaveformService } from '../../../features/activities/services/waveform.service';
import WaveSurfer from 'wavesurfer.js';

type WaveSurferOptions = Parameters<typeof WaveSurfer.create>[0];

@Component({
  selector: 'app-common-audio-uploader',
  standalone: true,
  imports: [NgIf, FileUploadModule, ButtonModule],
  templateUrl: './common-audio-uploader.component.html'
})
export class CommonAudioUploaderComponent implements AfterViewInit {
  @Input() audioUrl: string | null = null;
  @Input() audioStart: number = 0;
  @Input() audioEnd: number | null = null;
  @Input() waveOptions: Partial<WaveSurferOptions> = {};
  @Output() audioChange = new EventEmitter<File | null>();
  @Output() regionChange = new EventEmitter<{ start: number; end: number | null }>();
  @Output() waveformReady = new EventEmitter<void>();

  @ViewChild('waveformContainerRef') waveformContainerRef!: ElementRef;

  isPlaying = false;
  private readonly audioId = 0;

  constructor(private waveformService: WaveformService) {}

  ngAfterViewInit(): void {
    // Esperar un ciclo de detección para que ViewChild esté listo
    Promise.resolve().then(() => {
      this.setupWaveform();
    });
  }


  setupWaveform() {
    if (this.audioUrl && this.waveformContainerRef) {
      this.waveformService.createWaveform(
        this.waveformContainerRef.nativeElement,
        this.audioUrl,
        this.audioId,
        this.audioStart,
        this.audioEnd ?? undefined,
        (region) => {
          this.regionChange.emit(region);
          this.waveformReady.emit(); // ✅ emitir solo cuando ya está realmente lista la región
        },
        this.waveOptions // ✅ pasamos las opciones personalizadas
      );
    }
  }

  togglePlay() {
    this.isPlaying = this.waveformService.togglePlay(this.audioId, () => {
      this.isPlaying = false;
    });
  }

  onSelect(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.audioUrl = URL.createObjectURL(file);
      this.audioStart = 0;
      this.audioEnd = null;
      this.audioChange.emit(file);
      this.setupWaveform();
    }
  }

getRegion(): { start: number; end: number | null } | null {
  return this.waveformService.getRegion(this.audioId);
}

clearAudio(): void {
  this.audioUrl = null;
  this.audioStart = 0;
  this.audioEnd = null;
  this.waveformService.destroyWaveform(this.audioId); // Borra el waveform visual
  this.audioChange.emit(null); // Notifica al padre
}
}
