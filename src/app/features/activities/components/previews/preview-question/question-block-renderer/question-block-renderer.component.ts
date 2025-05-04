import { Component, Input, OnChanges, Type, Injector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModel } from '../../../../models/question.model';
import { LayoutBlock } from '../../../../models/question-layout-config.model';
import { blockRegistry } from '../../../../utils/block-registry';

@Component({
  selector: 'app-question-block-renderer',
  imports: [CommonModule],
  templateUrl: './question-block-renderer.component.html',
  styleUrl: './question-block-renderer.component.scss'
})
export class QuestionBlockRendererComponent implements OnChanges {
  @Input() block!: LayoutBlock;
  @Input() question!: QuestionModel;

  component: Type<any> | null = null;
  injector!: Injector;

  constructor(private parentInjector: Injector) {}

  ngOnChanges(): void {
    this.component = blockRegistry[this.block.type] ?? null;

    if (this.component) {
      const inputs = this.mapInputs(this.block, this.question);
      this.injector = Injector.create({
        providers: Object.entries(inputs).map(([key, value]) => ({
          provide: key,
          useValue: value
        })),
        parent: this.parentInjector
      });
    }
  }

  private mapInputs(block: LayoutBlock, question: QuestionModel): Record<string, any> {
    console.log(question);
    
    switch (block.type) {
      case 'text':
        return { text: question.text, withBorder: !!block.style?.border, align: block.align || 'center' };
      case 'description':
        return { description: question.description, withBorder: !!block.style?.border };
      default:
        return {};
    }
  }
}
