export interface TableHeader {
  header: string;
  isSortable: boolean;
  field:string;
  showMenu: boolean;
  filterType: 'text' | 'multiSelect'| null; // Tipo de filtro
  isHidden: boolean;
  matchMode?: string; // Opcional, solo para el caso de filterType 'multiSelect'
  options?: any[]; // Opcional, solo para el caso de filterType 'multiSelect'
}