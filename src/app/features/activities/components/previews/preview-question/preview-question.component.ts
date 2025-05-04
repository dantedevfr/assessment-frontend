import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuestionModel } from '../../../models/question.model';
import {
  LayoutBlock,
  QuestionLayoutConfig
} from '../../../models/question-layout-config.model';

import { selectActivityBuilder, updateActivity } from '../../../state';
import { QuestionBlockRendererComponent } from './question-block-renderer/question-block-renderer.component';

@Component({
  selector: 'app-preview-question',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule,QuestionBlockRendererComponent],
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
      display: 'grid',
      'grid-template-columns': `repeat(${this.layoutConfig.gridColumns}, 1fr)`,
      gap: `${this.layoutConfig.gridGap || 12}px`,
      padding: `${this.layoutConfig.padding || 0}px`,
      'background-color': this.layoutConfig.backgroundColor || '#f8f9fa'
    };
  }

  getBlockGridStyle(block: LayoutBlock): Record<string, string> {
    return {
      'grid-column': `${block.position.colStart} / span ${block.position.colSpan}`,
      'grid-row': `${block.position.rowStart}`
    };
  }

  getBlockContent(block: LayoutBlock): string {
    switch (block.type) {
      case 'text': return this.question.text || '[Texto vacío]';
      case 'description': return this.question.description || '[Descripción vacía]';
      case 'media': return '🖼️ Contenido multimedia';
      case 'options': return '✅ Opciones de respuesta';
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

     // ⬇ Normaliza las filas para evitar duplicados
  this.normalizeRowStarts();

    this.store.dispatch(updateActivity({
      changes: {
        layoutConfig: structuredClone(this.layoutConfig)
      }
    }));
  }

onDrop(event: CdkDragDrop<LayoutBlock[]>): void {
  moveItemInArray(this.layoutConfig.blocks, event.previousIndex, event.currentIndex);

  // Reasignar rowStart secuencialmente para evitar duplicados
  this.layoutConfig.blocks.forEach((block, index) => {
    block.position.rowStart = index + 1;
  });

  this.updateConfig();
}

  getBlockClasses(block: LayoutBlock): string[] {
    const classes: string[] = [];

    switch (block.style?.width) {
      case 'full': classes.push('w-full'); break;
      case 'fit': classes.push('w-fit'); break;
      case 'auto':
      default: classes.push('w-auto'); break;
    }

    switch (block.style?.alignSelf) {
      case 'center': classes.push('self-center'); break;
      case 'end': classes.push('self-end'); break;
      case 'stretch': classes.push('self-stretch'); break;
      case 'start':
      default: classes.push('self-start'); break;
    }

    return classes;
  }
  normalizeRowStarts(): void {
    const blocksSorted = [...this.layoutConfig.blocks].sort((a, b) => a.position.rowStart - b.position.rowStart);
    blocksSorted.forEach((block, index) => {
      block.position.rowStart = index + 1;
    });
  
    this.layoutConfig.blocks = blocksSorted;
  }
}



