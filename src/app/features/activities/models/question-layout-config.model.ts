export type BlockType = 'text' | 'description' | 'media' | 'options';

export type LayoutAlignment = 'start' | 'center' | 'end' | 'space-between';
export type BlockWidth = 'auto' | 'fit' | 'full';
export type BlockSelfAlign = 'start' | 'center' | 'end' | 'stretch';

export interface GridPosition {
  colStart: number;  // de 1 a gridColumns
  colSpan: number;   // cuántas columnas ocupa
  rowStart: number;  // posición vertical en orden
}

export interface BlockStyle {
  width: BlockWidth; // ancho del contenido interno
  alignSelf: BlockSelfAlign; // alineación vertical
  padding?: number;         // padding interno
  border?: boolean;         // borde opcional
  backgroundColor?: string;
  borderRadius?: number;
}

export interface LayoutBlock {
  id: string;
  type: BlockType;
  position: GridPosition;
  style: BlockStyle;
  align?: LayoutAlignment; // horizontal (usado si no se controla solo con grid)
  hidden?: boolean;        // útil para bloques condicionales (como media)
}

export interface QuestionLayoutConfig {
  gridColumns: number;      // normalmente 12
  gridGap?: number;         // espacio entre bloques
  padding?: number;         // padding global
  margin?: number;          // margen global si lo necesitas
  backgroundColor?: string;
  backgroundImageUrl?: string;
  animateOnLoad?: boolean;
  ambientEnabled?: boolean;
  blocks: LayoutBlock[];    // lista plana y ordenada
}
