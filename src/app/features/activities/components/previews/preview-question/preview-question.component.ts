import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { QuestionModel } from '../../../models/question.model';
import {
  LayoutBlock,
  QuestionLayoutConfig,
  BlockStyle
} from '../../../models/question-layout-config.model';

import { selectActivityBuilder, updateActivity } from '../../../state';

@Component({
  selector: 'app-preview-question',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss']
})
export class PreviewQuestionComponent implements OnInit {
  private store = inject(Store);

  layoutConfig!: QuestionLayoutConfig;
  question!: QuestionModel;
  selectedBlock?: LayoutBlock;

  ngOnInit(): void {
    this.store.select(selectActivityBuilder).subscribe(activity => {
      this.layoutConfig = structuredClone(activity.layoutConfig ?? {
        gridColumns: 12,
        gridGap: 16,
        padding: 24,
        backgroundColor: '#ffffff',
        animateOnLoad: false,
        ambientEnabled: false,
        blocks: []
      });
      
      this.question = structuredClone(activity.question ?? {
        text: '',
        description: '',
        type: 'multiple_choice',
        isMandatory: false,
        translations: [],
        wordBreakdown: [],
        media: [],
        answers: []
      });
    });
  }

  getGridStyles(): Record<string, any> {
    return {
      'grid-template-columns': `repeat(${this.layoutConfig.gridColumns}, 1fr)`,
      'gap.px': this.layoutConfig.gridGap || 12,
      'padding.px': this.layoutConfig.padding || 0,
      'background-color': this.layoutConfig.backgroundColor || '#f8f9fa'
    };
  }

  getBlockGridStyle(block: LayoutBlock): Record<string, string> {
    return {
      'grid-column': `${block.position.colStart} / span ${block.position.colSpan}`,
      'grid-row': `${block.position.rowStart} / span ${block.position.rowSpan ?? 1}`
    };
  }

  getBlockContent(block: LayoutBlock): string {
    switch (block.type) {
      case 'text': return this.question.text;
      case 'description': return this.question.description;
      case 'media': return 'Contenido multimedia';
      case 'options': return 'Opciones de respuesta';
      default: return '[Bloque desconocido]';
    }
  }

  selectBlock(block: LayoutBlock) {
    this.selectedBlock = structuredClone(block);
  }

  updateConfig(): void {
    if (!this.selectedBlock) return;

    const updatedBlock = structuredClone(this.selectedBlock);

    this.layoutConfig.blocks = this.layoutConfig.blocks.map(b =>
      b.id === updatedBlock.id ? updatedBlock : b
    );

    this.selectedBlock = updatedBlock;

    this.store.dispatch(updateActivity({
      changes: {
        layoutConfig: structuredClone(this.layoutConfig)
      }
    }));
  }

  onDrop(event: CdkDragDrop<LayoutBlock[]>): void {
    moveItemInArray(this.layoutConfig.blocks, event.previousIndex, event.currentIndex);

    // Recalcular colStart por fila
    const blocksByRow = this.layoutConfig.blocks.reduce((acc, block) => {
      const row = block.position.rowStart;
      acc[row] = acc[row] || [];
      acc[row].push(block);
      return acc;
    }, {} as Record<number, LayoutBlock[]>);

    for (const rowBlocks of Object.values(blocksByRow)) {
      let col = 1;
      for (const block of rowBlocks) {
        block.position.colStart = col;
        col += block.position.colSpan;
      }
    }

    this.updateConfig();
  }


  getBlockClasses(block: LayoutBlock): string[] {
    const classes: string[] = [];
  
    // Width class
    switch (block.style?.width) {
      case 'full': classes.push('w-full'); break;
      case 'fit': classes.push('w-fit'); break;
      case 'auto':
      default: classes.push('w-auto'); break;
    }
  
    // Align-self class
    switch (block.style?.alignSelf) {
      case 'center': classes.push('self-center'); break;
      case 'end': classes.push('self-end'); break;
      case 'stretch': classes.push('self-stretch'); break;
      case 'start':
      default: classes.push('self-start'); break;
    }
  
    return classes;
  }
  
  
}


/*import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { updateActivity, selectActivityBuilder } from '../../../state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  QuestionLayoutConfig,
  LayoutBlock,
  BlockStyle
} from '../../../models/question-layout-config.model';
import { QuestionModel } from '../../../models/question.model';

@Component({
  selector: 'app-preview-question',
  imports: [CommonModule, FormsModule,DragDropModule],
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss'],
  standalone: true
})
export class PreviewQuestionComponent implements OnInit {
  private store = inject(Store);

  layoutConfig!: QuestionLayoutConfig;
  question!: QuestionModel;
  selectedBlock?: LayoutBlock;

  ngOnInit(): void {
    this.store.select(selectActivityBuilder).subscribe(activity => {
      this.layoutConfig = structuredClone(activity.layoutConfig ?? {
        gridColumns: 12,
        gridGap: 16,
        padding: 24,
        backgroundColor: '#ffffff',
        animateOnLoad: false,
        ambientEnabled: false,
        blocks: []
      });
      
      this.question = structuredClone(activity.question ?? {
        text: '',
        description: '',
        type: 'multiple_choice',
        isMandatory: false,
        translations: [],
        wordBreakdown: [],
        media: [],
        answers: []
      });
    });
  }

  getGridStyles(): Record<string, any> {
    return {
      'grid-template-columns': `repeat(${this.layoutConfig.gridColumns}, 1fr)`,
      'gap.px': this.layoutConfig.gridGap || 12,
      'padding.px': this.layoutConfig.padding || 0,
      'background-color': this.layoutConfig.backgroundColor || '#f8f9fa'
    };
  }

  getBlockGridStyle(block: LayoutBlock): Record<string, string> {
    return {
      'grid-column': `${block.position.colStart} / span ${block.position.colSpan}`,
      'grid-row': `${block.position.rowStart} / span ${block.position.rowSpan ?? 1}`
    };
  }

  getBlockContent(block: LayoutBlock): string {
    switch (block.type) {
      case 'text': return this.question.text;
      case 'description': return this.question.description;
      case 'media': return 'Contenido multimedia';
      case 'options': return 'Opciones (respuestas)';
      default: return '[bloque]';
    }
  }

  selectBlock(block: LayoutBlock) {
    this.selectedBlock = block;
  }

  updateConfig(): void {
    if (!this.selectedBlock) return;
  
    const updatedBlock = structuredClone(this.selectedBlock);
  
    // 🧠 Reemplaza el bloque en layoutConfig.blocks por referencia nueva
    this.layoutConfig.blocks = this.layoutConfig.blocks.map(b =>
      b.id === updatedBlock.id ? updatedBlock : b
    );
  
    // 🔁 Asegura que selectedBlock apunte al nuevo objeto (opcional si lo sigues usando)
    this.selectedBlock = updatedBlock;
  
    // 🏁 Finalmente actualiza el store
    this.store.dispatch(updateActivity({
      changes: {
        layoutConfig: structuredClone(this.layoutConfig)
      }
    }));
  }
  

  onDrop(event: CdkDragDrop<LayoutBlock[]>) {
    moveItemInArray(this.layoutConfig.blocks, event.previousIndex, event.currentIndex);

    // Recalcular colStart dentro de la misma fila para mantener coherencia visual
    const blocksByRow = this.layoutConfig.blocks.reduce((acc, block) => {
      const row = block.position.rowStart;
      acc[row] = acc[row] || [];
      acc[row].push(block);
      return acc;
    }, {} as Record<number, LayoutBlock[]>);

    for (const rowBlocks of Object.values(blocksByRow)) {
      let col = 1;
      for (const block of rowBlocks) {
        block.position.colStart = col;
        col += block.position.colSpan;
      }
    }

    this.updateConfig();
  }
}
*/


