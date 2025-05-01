import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/plugins/regions';

@Injectable({ providedIn: 'root' })
export class WaveformService {
  private waveSurfers: { [wordId: number]: WaveSurfer } = {};
  private regionsPlugins: { [wordId: number]: ReturnType<typeof RegionsPlugin.create> } = {};

  /**
   * Crea un nuevo waveform y región para un audio
   */
  createWaveform(
    container: HTMLElement,
    audioUrl: string,
    wordId: number,
    start = 0,
    end?: number,
    onRegionReady?: (region: { start: number; end: number }) => void
  ): void {
    this.destroyWaveform(wordId);
  
    const waveSurfer = WaveSurfer.create({
      container,
      waveColor: '#A0AEC0',
      progressColor: '#3182CE',
      height: 120,
    });
  
    const regionsPlugin = RegionsPlugin.create();
    waveSurfer.registerPlugin(regionsPlugin);
    waveSurfer.load(audioUrl);
  
    waveSurfer.once('ready', () => {
      const duration = waveSurfer.getDuration();
      const region = regionsPlugin.addRegion({
        start: start ?? 0,
        end: end ?? duration,
        color: 'rgba(0, 123, 255, 0.1)',
        drag: true,
        resize: true,
      });
  
      this.waveSurfers[wordId] = waveSurfer;
      this.regionsPlugins[wordId] = regionsPlugin;
  
      if (onRegionReady) {
        onRegionReady({ start: region.start, end: region.end });
      }
    });
  }

  /**
   * Actualiza el inicio y fin de la primera región existente
   */
  updateRegion(wordId: number, start: number, end: number): void {
    const plugin = this.regionsPlugins[wordId];
    if (!plugin) return;

    const regions = plugin.getRegions();
    const allRegions = Object.values(regions) as Region[];
    const region = allRegions[0];

    if (region) {
      region.remove(); // Elimina la región actual
      plugin.addRegion({
        start,
        end,
        color: 'rgba(0, 123, 255, 0.1)',
        drag: true,
        resize: true,
      });
    }
  }

  /**
   * Devuelve los tiempos de la región principal
   */
  getRegion(wordId: number): { start: number; end: number } | null {
    const plugin = this.regionsPlugins[wordId];
    if (!plugin) return null;

    const allRegions = Object.values(plugin.getRegions()) as Region[];
    const region = allRegions[0];
    return region ? { start: region.start, end: region.end } : null;
  }

  /**
   * Reproduce la región (o todo el audio) y ejecuta un callback al terminar
   */
  togglePlay(wordId: number, onFinish: () => void): boolean {
    const wave = this.waveSurfers[wordId];
    if (!wave) return false;

    const plugin = this.regionsPlugins[wordId];
    const allRegions = plugin ? (Object.values(plugin.getRegions()) as Region[]) : [];
    const region = allRegions[0];

    if (wave.isPlaying()) {
      wave.pause();
      return false;
    } else {
      if (region) {
        wave.play(region.start, region.end);
      } else {
        wave.play();
      }
      wave.once('finish', onFinish);
      return true;
    }
  }

  /**
   * Destruye el waveform de una palabra
   */
  destroyWaveform(wordId: number): void {
    this.waveSurfers[wordId]?.destroy();
    delete this.waveSurfers[wordId];
    delete this.regionsPlugins[wordId];
  }

  /**
   * Destruye todos los waveforms activos
   */
  destroyAllWaveforms(): void {
    Object.values(this.waveSurfers).forEach(w => w.destroy());
    this.waveSurfers = {};
    this.regionsPlugins = {};
  }

  getInstance(wordId: number): WaveSurfer | undefined {
    return this.waveSurfers[wordId];
  }
}
