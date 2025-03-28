export interface AppSettings {
  preset: 'Aura' | 'Lara' | 'Nora';       // Tema base de Prime (o tu propio set)
  colorScheme: 'light' | 'dark';          // Claro u oscuro
  primaryColor: string;                   // Color principal (puede ser #hex, 'blue', etc.)
  menuType: 'static' | 'overlay' | 'slim' | 'reveal' | 'drawer' | 'horizontal';
}
