import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectActivityBuilder, updateActivity } from '../../../state';
import { FormsModule } from '@angular/forms';

import {
  QuestionModel
} from '../../../models/question.model';
import {
  QuestionLayoutConfig,
  LayoutBlock,
  BlockStyle,
  BlockType,
  BlockWidth,
  BlockSelfAlign
} from '../../../models/question-layout-config.model';

@Component({
  selector: 'app-preview-question',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss']
})
export class PreviewQuestionComponent implements OnInit {
  private store = inject(Store);

  layoutConfig!: QuestionLayoutConfig;
  question!: QuestionModel;
  widths: BlockWidth[] = ['auto', 'fit', 'full'];
  selfAligns: BlockSelfAlign[] = ['start', 'center', 'end', 'stretch'];
  
  ngOnInit() {
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

      this.layoutConfig.blocks.forEach(block => this.initBlockStyle(block));

    });
  }

  getGridTemplateColumns(): string {
    return `repeat(${this.layoutConfig.gridColumns}, 1fr)`;
  }

  getBlockGridStyle(block: LayoutBlock): Record<string, string> {
    const pos = block.position;
    return {
      'grid-column': `${pos.colStart} / span ${pos.colSpan}`,
      'grid-row': `${pos.rowStart} / span ${pos.rowSpan ?? 1}`
    };
  }

  getBlockClasses(block: LayoutBlock): string[] {
    const style = block.style;
    const classes = ['block-container'];

    switch (style?.alignSelf) {
      case 'center': classes.push('self-center'); break;
      case 'end': classes.push('self-end'); break;
      case 'stretch': classes.push('self-stretch'); break;
      default: classes.push('self-start'); break;
    }

    switch (style?.width) {
      case 'full': classes.push('w-full'); break;
      case 'fit': classes.push('w-fit'); break;
      default: classes.push('w-auto'); break;
    }

    return classes;
  }

  getBlockContent(block: LayoutBlock): string {
    switch (block.type) {
      case 'text': return this.question.text;
      case 'description': return this.question.description;
      case 'options': return 'Opciones (respuestas)';
      case 'media': return 'Contenido multimedia';
      default: return '[Bloque desconocido]';
    }
  }

  updateConfig() {
    this.store.dispatch(updateActivity({
      changes: {
        layoutConfig: structuredClone(this.layoutConfig)
      }
    }));
  }

  initBlockStyle(block: LayoutBlock) {
    if (!block.style) {
      block.style = {
        width: 'auto',
        alignSelf: 'start',
        padding: 0,
        border: false,
        backgroundColor: '#ffffff',
        borderRadius: 0
      };
    }
  }

  getBlockStyle(block: LayoutBlock): BlockStyle {
    if (!block.style) {
      block.style = {
        width: 'auto',
        alignSelf: 'start',
        padding: 0,
        border: false,
        backgroundColor: '#ffffff',
        borderRadius: 0
      };
    }
    return block.style;
  }
}
