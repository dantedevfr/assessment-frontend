import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa los módulos de PrimeNG que necesites
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';

// ... otros módulos de PrimeNG

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    KnobModule,
    // ... otros módulos de PrimeNG
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    KnobModule,
    // ... exporta los mismos módulos para usarlos en otros lugares
  ]
})
export class SharedPrimeModule { }
