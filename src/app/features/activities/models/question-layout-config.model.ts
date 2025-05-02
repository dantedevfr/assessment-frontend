export type LayoutPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type LayoutDirection = 'vertical' | 'horizontal' | 'grid';
export type LayoutAlignment = 'start' | 'center' | 'end' | 'space-between';
export type BlockWidth = 'auto' | 'fit' | 'full';
export type BlockSelfAlign = 'start' | 'center' | 'end' | 'stretch';
export type BlockType = 'text' | 'description' | 'media' | 'options';

export interface BlockStyle {
  width?: BlockWidth;
  alignSelf?: BlockSelfAlign;
}

export interface QuestionLayoutConfig {
  backgroundColor?: string;
  backgroundImageUrl?: string;
  direction?: LayoutDirection;

  blockOrder?: {
    [P in LayoutPosition]?: BlockType[];
  };
  blockDirection?: {
    [P in LayoutPosition]?: LayoutDirection;
  };
  blockAlign?: {
    [P in LayoutPosition]?: LayoutAlignment;
  };
  blockStyles?: {
    [K in BlockType]?: BlockStyle;
  };

  textAlign?: 'left' | 'center' | 'right';
  descriptionAlign?: 'left' | 'center' | 'right';
  padding?: number;
  borderRadius?: number;
  showTextBorder?: boolean;
  showMediaBorder?: boolean;

  mediaSize?: 'small' | 'medium' | 'large' | 'full';
  audioBehavior?: 'autoplay' | 'onTextClick' | 'onIconClick' | 'manual';
  audioStyle?: 'default' | 'duolingo' | 'minimal';

  ambientEnabled?: boolean;
  animateOnLoad?: boolean;
}
