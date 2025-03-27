import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa los módulos de PrimeNG que necesites
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
// ... otros módulos de PrimeNG

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    KnobModule,
    DataView,
    Tag,
    CardModule,
    FormsModule,
    MessageModule,
    
    // ... otros módulos de PrimeNG
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    KnobModule,
    DataView,
    Tag,
    CardModule,
    FormsModule,
    MessageModule,
    // ... exporta los mismos módulos para usarlos en otros lugares
  ]
})
export class SharedPrimeModule { }
