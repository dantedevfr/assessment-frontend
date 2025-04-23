export interface MediaModel {
  type: 'audio' | 'video' | 'image';
  url: string;
  startTime?: number;
  endTime?: number;
}

