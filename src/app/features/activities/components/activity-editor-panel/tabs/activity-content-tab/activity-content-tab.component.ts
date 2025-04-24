import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Category } from '../../../../../categories/models/category.model';
import { TreeNode } from 'primeng/api';
import { Store } from '@ngrx/store';
import { ActivityModel } from '../../../../models/activity.model';
import { selectActivityBuilder, updateActivity } from '../../../../state';
import { buildCategoryTree } from '../../../../utils/build-tree.util';
import { TreeSelectModule } from 'primeng/treeselect';
import { selectAllCategories } from '../../../../../categories/state/categories.selectors';
import * as CategoryActions from '../../../../../categories/state/categories.actions';
import { combineLatest } from 'rxjs';
import { ACTIVITY_TYPES, QUESTION_SUBTYPES } from '../../../../config/activity-config';
import { findNodeById } from '../../../../utils/build-tree.util';
import { QuestionType } from '../../../../models/question.model';
@Component({
  selector: 'app-activity-content-tab',
  imports: [CommonModule, FormsModule, SelectModule,TreeSelectModule],
  templateUrl: './activity-content-tab.component.html',
  styleUrl: './activity-content-tab.component.scss'
})
export class ActivityContentTabComponent {
  activity: ActivityModel = {
    type: 'question'
  };

  activityTypes = ACTIVITY_TYPES;
  questionSubtypes = QUESTION_SUBTYPES;

  categories: Category[] = [];
  categoryTree: TreeNode[] = [];
  selectedNode: TreeNode | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectActivityBuilder),
      this.store.select(selectAllCategories)
    ]).subscribe(([activity, categories]) => {
      this.activity = activity;

      if (!categories || categories.length === 0) {
        this.store.dispatch(CategoryActions.loadAllCategories());
        return;
      }

      this.categoryTree = buildCategoryTree(categories);
      this.selectedNode = findNodeById(this.categoryTree, activity.id_category);
    });
  }

  updateField<K extends keyof ActivityModel>(field: K, value: ActivityModel[K]) {
    this.store.dispatch(updateActivity({ changes: { [field]: value } }));
  }

  onCategorySelect(event: any) {
    const id = event.node?.data?.id;
    this.updateField('id_category', id);
  }

  get isQuestion(): boolean {
    return this.activity.type === 'question';
  }

  onActivityTypeChange(newType: ActivityModel['type']) {
    this.updateField('type', newType);
  }

  onQuestionTypeChange(type: QuestionType) {
    this.store.dispatch(updateActivity({
      changes: {
        question: {
          ...this.activity.question,
          type,
        }
      }
    }));
  }
}
