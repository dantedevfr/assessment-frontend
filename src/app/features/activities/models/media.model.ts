export interface MediaModel {
  type: 'audio' | 'video' | 'image';
  url: string;
  position?:string;
  startTime?: number;
  endTime?: number;
}

