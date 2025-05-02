export type BlockType = 'text' | 'description' | 'media' | 'options';
export type LayoutAlignment = 'start' | 'center' | 'end' | 'space-between';
export type BlockWidth = 'auto' | 'fit' | 'full';
export type BlockSelfAlign = 'start' | 'center' | 'end' | 'stretch';

export interface GridPosition {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan?: number;
}

export interface BlockStyle {
  width?: BlockWidth;
  alignSelf?: BlockSelfAlign;
  padding?: number;
  border?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
}

export interface LayoutBlock {
  id: string;
  type: BlockType;
  content?: any;
  position: GridPosition;
  align?: LayoutAlignment;
  style?: BlockStyle;
}

export interface QuestionLayoutConfig {
  gridColumns: number;
  gridGap?: number;
  padding?: number;
  backgroundColor?: string;
  backgroundImageUrl?: string;
  animateOnLoad?: boolean;
  ambientEnabled?: boolean;
  blocks: LayoutBlock[];
}
