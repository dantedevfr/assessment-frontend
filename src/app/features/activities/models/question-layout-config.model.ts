export type LayoutPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type LayoutDirection = 'vertical' | 'horizontal' | 'grid';
export type MediaSize = 'small' | 'medium' | 'large' | 'full';
export type AudioBehavior = 'autoplay' | 'onTextClick' | 'onIconClick' | 'manual';
export type AudioStyle = 'default' | 'duolingo' | 'minimal';

export interface QuestionLayoutConfig {
  // 🖼️ Estética general
  backgroundColor?: string;
  backgroundImageUrl?: string;
  direction?: LayoutDirection;

  // 📦 Posiciones de bloques
  textPosition?: LayoutPosition;
  descriptionPosition?: LayoutPosition;
  mediaPosition?: LayoutPosition;
  optionsPosition?: LayoutPosition;
  textAlign?: 'left' | 'center' | 'right';
  descriptionAlign?: 'left' | 'center' | 'right';
  
  // 🔊 Media y audio
  mediaSize?: MediaSize;
  audioBehavior?: AudioBehavior;
  audioStyle?: AudioStyle;

  // 🎨 Estilos opcionales
  padding?: number;
  borderRadius?: number;
  showTextBorder?: boolean;
  showMediaBorder?: boolean;

  // 🛠️ Flags adicionales para el futuro
  ambientEnabled?: boolean; // para sonidos/animaciones de fondo
  animateOnLoad?: boolean;
}