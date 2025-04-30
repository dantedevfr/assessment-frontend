// audio-utils.ts
import { MediaModel } from '../models/media.model';
/**
 * Retorna el objeto de audio del arreglo de medios
 */
export function getAudioMedia(media: MediaModel[] | undefined): MediaModel | null {
  if (!media) return null;
  return media.find(m => m.type === 'audio') || null;
}

/**
 * Retorna el objeto de imagen del arreglo de medios
 */
export function getImageMedia(media: MediaModel[] | undefined): MediaModel | null {
  if (!media) return null;
  return media.find(m => m.type === 'image') || null;
}
