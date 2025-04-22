import { Component, inject } from '@angular/core';
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
import { ApiClientService } from '../../../../../../core/services/api-client.service';

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

  activityTypes = [
    { label: 'Pregunta', value: 'question' },
    { label: 'Emparejamiento', value: 'match_pairs' },
    { label: 'Traducción', value: 'translation' },
    { label: 'Completar espacios', value: 'fill_in_blank' },
    { label: 'Adivina la palabra', value: 'guess_the_word' }
  ];

  questionSubtypes = [
    { label: 'Opción múltiple', value: 'multiple_choice' },
    { label: 'Verdadero/Falso', value: 'true_false' },
    { label: 'Pregunta abierta', value: 'open' },
    { label: 'Pregunta simple', value: 'simple' }
  ];

  categories: Category[] = []; // ⚠️ Deberías inyectar servicio y cargar esto desde backend
  categoryTree: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  private api = inject(ApiClientService);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Escuchar cambios en la actividad
    this.store.select(selectActivityBuilder).subscribe((activity) => {
      this.activity = activity;
      this.selectedNode = this.findNodeById(this.categoryTree, activity.id_category);
    });

    // Escuchar categorías del store
    this.store.select(selectAllCategories).subscribe((categories) => {
      if (!categories || categories.length === 0) {
        this.store.dispatch(CategoryActions.loadAllCategories()); // 🔄 carga inicial
      } else {
        this.categoryTree = buildCategoryTree(categories);
      }
    });
  }

  updateField<K extends keyof ActivityModel>(field: K, value: ActivityModel[K]) {
    this.store.dispatch(updateActivity({ changes: { [field]: value } }));
  }

  onCategorySelect(event: any) {
    const id = event.node?.data?.id;
    this.updateField('id_category', id);
  }

  private findNodeById(nodes: TreeNode[], id?: number): TreeNode | null {
    if (!id) return null;
    for (const node of nodes) {
      if (node.data?.id === id) return node;
      if (node.children) {
        const found = this.findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  get isQuestion(): boolean {
    return this.activity.type === 'question';
  }

  onActivityTypeChange(newType: ActivityModel['type']) {
    this.updateField('type', newType);
  }
}
