import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  QuestionLayoutConfig,
  LayoutPosition,
  LayoutAlignment,
  BlockType,
  BlockWidth,
  BlockSelfAlign,
  BlockStyle
} from '../../../models/question-layout-config.model';

import { QuestionModel } from '../../../models/question.model';
import { updateActivity, selectActivityBuilder } from '../../../state';

@Component({
  selector: 'app-preview-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss']
})
export class PreviewQuestionComponent implements OnInit {
  private store = inject(Store);

  @Input() question!: QuestionModel;
  @Input() layoutConfig!: QuestionLayoutConfig;

  layoutPositions: LayoutPosition[] = ['top', 'left', 'center', 'right', 'bottom'];
  blockTypes: BlockType[] = ['text', 'description', 'media', 'options'];
  alignments: LayoutAlignment[] = ['start', 'center', 'end', 'space-between'];
  widths: BlockWidth[] = ['auto', 'fit', 'full'];
  selfAligns: BlockSelfAlign[] = ['start', 'center', 'end', 'stretch'];

  ngOnInit() {
    this.store.select(selectActivityBuilder).subscribe(activity => {
      // Clonamos para evitar mutaciones directas
      this.layoutConfig = structuredClone(activity.layoutConfig ?? {});
      this.question = activity.question ?? {
        text: '',
        description: '',
        type: 'multiple_choice',
        isMandatory: false,
        translations: [],
        wordBreakdown: [],
        media: [],
        answers: []
      };
    });
  }

  private updateLayoutConfig(config: QuestionLayoutConfig) {
    this.layoutConfig = config;
    this.store.dispatch(updateActivity({
      changes: {
        layoutConfig: structuredClone(config)
      }
    }));
  }

  getItemsInPosition(position: LayoutPosition): BlockType[] {
    return this.layoutConfig.blockOrder?.[position] ?? [];
  }

  getDirectionClass(position: LayoutPosition): string {
    const dir = this.layoutConfig.blockDirection?.[position] ?? 'vertical';
    return dir === 'horizontal' ? 'flex-row' : 'flex-col';
  }

  getAlignClass(position: LayoutPosition): string {
    const align = this.layoutConfig.blockAlign?.[position] ?? 'start';
    switch (align) {
      case 'center': return 'justify-center items-center';
      case 'end': return 'justify-end items-end';
      case 'space-between': return 'justify-between items-center';
      default: return 'justify-start items-start';
    }
  }

  getBlockWidthClass(block: BlockType): string {
    const style = this.layoutConfig.blockStyles?.[block];
    switch (style?.width) {
      case 'full': return 'w-full';
      case 'fit': return 'w-fit';
      default: return 'w-auto';
    }
  }

  getBlockAlignSelfClass(block: BlockType): string {
    const style = this.layoutConfig.blockStyles?.[block];
    switch (style?.alignSelf) {
      case 'center': return 'self-center';
      case 'end': return 'self-end';
      case 'stretch': return 'self-stretch';
      default: return 'self-start';
    }
  }

  updateBlockOrder(position: LayoutPosition, block: BlockType) {
    const config = structuredClone(this.layoutConfig);
    const current = config.blockOrder?.[position] ?? [];
    const exists = current.includes(block);
    const updated = exists
      ? current.filter(item => item !== block)
      : [...current, block];

    config.blockOrder = {
      ...config.blockOrder,
      [position]: updated
    };

    this.updateLayoutConfig(config);
  }

  setBlockDirection(position: LayoutPosition, dir: 'horizontal' | 'vertical') {
    const config = structuredClone(this.layoutConfig);
    config.blockDirection = {
      ...config.blockDirection,
      [position]: dir
    };
    this.updateLayoutConfig(config);
  }

  setBlockAlign(position: LayoutPosition, align: LayoutAlignment) {
    const config = structuredClone(this.layoutConfig);
    config.blockAlign = {
      ...config.blockAlign,
      [position]: align
    };
    this.updateLayoutConfig(config);
  }

  setBlockStyle(block: BlockType, prop: keyof BlockStyle, value: string) {
    const config = structuredClone(this.layoutConfig);
    config.blockStyles = {
      ...config.blockStyles,
      [block]: {
        ...config.blockStyles?.[block],
        [prop]: value
      }
    };
    this.updateLayoutConfig(config);
  }
}
