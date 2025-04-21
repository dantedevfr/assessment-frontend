import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
  
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { TableFacadeService } from '../../../../core/services/table-facade-service';
import { getDefaultTableState } from '../../../../shared/state/table/table.utils';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable, take } from 'rxjs';
import { TableColumn, RowAction } from '../../../../shared/models/table.model';

import {
  ACTIVITY_COLUMNS,
  ACTIVITY_ACTIONS,
  ACTIVITY_GLOBAL_FILTERS,
  ACTIVITY_TABLE_FILTERS,
} from '../../config/activities-table.config';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-activities-management-page',
  standalone: true,
  imports: [
    CommonModule,
       FormsModule,
       TableModule,
       TagModule,
       RatingModule,
       CommonTableComponent
  ],
  templateUrl: './activities-management-page.component.html',
  styleUrl: './activities-management-page.component.scss',
})
export class ActivitiesManagementPageComponent {
  private tableId = 'activitiesTable';
  private endpoint = 'activities';
  private tableService = inject(TableFacadeService);
 
  tableState$ = this.tableService.getState$(this.tableId);
  activities$!: Observable<any[]>;
  isLoading$!: Observable<boolean>;
  totalItems$!: Observable<number>;

  filters$ = this.tableState$.pipe(
    map(state => state?.filters ? JSON.parse(JSON.stringify(state.filters)) : {})
  );

  ngOnInit() {
    this.tableService.init(this.tableId, getDefaultTableState({
      filters: ACTIVITY_TABLE_FILTERS,
      sortField: 'title',
    }));
    this.activities$ = this.tableService.getData$(this.tableId);
    this.isLoading$ = this.tableService.getLoading$(this.tableId);
    this.totalItems$ = this.tableService.getTotalItems$(this.tableId);

    this.tableState$.pipe(take(1)).subscribe((state) => {
      if (state) {
        this.handleLazyLoad(state);
      } 
    });
  }

  selectedActivities: any[] = [];
  columns_activities: TableColumn[] = ACTIVITY_COLUMNS;
  globalFilterFields = ACTIVITY_GLOBAL_FILTERS;

  rowActions: RowAction[] = ACTIVITY_ACTIONS.map((action) => ({
    ...action,
    callback: (row: any) => {
      if (action.icon.includes('pencil')) this.editActivity(row);
      if (action.icon.includes('trash')) this.deleteActivity(row);
    }
  }));

  handleLazyLoad(event: LazyLoadEvent) {    
    console.log("se lanza primero");
    console.log(event);
    
    
    this.tableService.loadData(this.tableId, this.endpoint, event);    
  }

  reloadData() {
    console.log("entra al reload");
    
    this.tableService.reset(this.tableId, getDefaultTableState({
      filters: ACTIVITY_TABLE_FILTERS,
      sortField: 'title'
    }));
    console.log("pasa");

    this.tableState$.pipe(take(1)).subscribe((state) => {
      console.log("entra al suscribe");

      if (state) {
        this.handleLazyLoad(state);
      }
    });
  }

  editActivity(activity: any) {
    console.log('Edit activity', activity);
    // Aquí podrías abrir un modal, navegar, etc.
  }

  deleteActivity(activity: any) {
    console.log('Delete activity', activity);
    // Confirmar y eliminar lógica
  }

  handleCheckBoxAction(event: any) {
    this.selectedActivities = event;
  }

  getDifficultyLabel(key: string): string {
    const map: Record<string, string> = {
      easy: 'Fácil',
      medium: 'Media',
      hard: 'Difícil',
    };
    return map[key] ?? key;
  }
  
  getDifficultyColor(key: string): 'success' | 'info' | 'danger' | 'secondary' {
    const map: Record<string, 'success' | 'info' | 'danger'> = {
      easy: 'success',
      medium: 'info',
      hard: 'danger',
    };
    return map[key] ?? 'secondary';
  }
  
  getLocalizedActivityType(key: string): string {
    const map: Record<string, string> = {
      translation_word: 'Traducción',
      multiple_choice: 'Opción múltiple',
      simple_question: 'Pregunta simple',
      open_question: 'Pregunta abierta',
      match_pairs: 'Emparejamiento',
      audio_selection: 'Selección de audio',
      fill_in_the_blank: 'Completar espacios',
      word_order: 'Ordenar palabras',
      true_false: 'Verdadero o falso',
      odd_one_out: 'El que no pertenece',
      grammar_selection:'Selecciona la gramatica',
      image_selection:'Selecciona la imagen',
      multiple_answer:'Multiples respuestas',
      synonym_choice:'Escoge el sinonimo',
      translation_phrase:'Traduce la palabra'
    };
    return map[key] ?? key;
  }
  
  getLocalizedCategory(key: string): string {
    const map: Record<string, string> = {
      vocabulary: 'Vocabulario',
      greetings: 'Saludos',
      grammar: 'Gramática',
      culture: 'Cultura',
      logic: 'Lógica',
      education: 'Educación',
      verbs: 'Verbos',
      writing: 'Escritura',
    };
    return map[key] ?? key;
  }
  
  getLocalizedTag(key: string): string {
    const map: Record<string, string> = {
      beginner: 'Principiante',
      fruit: 'Frutas',
      french: 'Francés',
      hello: 'Hola',
      writing: 'Escritura',
      verb: 'Verbo',
      reasoning: 'Razonamiento',
      audio: 'Audio',
      order: 'Orden',
      noun: 'Sustantivo',
      grouping: 'Agrupación',
    };
    return map[key] ?? key;
  }





  getSeverityFromLabel(label?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    if (!label) return 'info';
   
    const normalized = label.toLowerCase();
    const map: Record<string, 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'> = {
      visible: 'success',
      oculta: 'warn',
      activa: 'success',
      expirada: 'danger',
      fácil: 'success',
      media: 'info',
      difícil: 'danger',
    };
  
    return map[normalized] ?? 'info';
  }
  
}
