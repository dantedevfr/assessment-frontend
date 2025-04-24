import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MediaModel } from '../../../../../../models/media.model';
import { QuestionModel } from '../../../../../../models/question.model'; // ajusta la ruta si es necesario
import { NotificationService } from '../../../../../../../../core/services/notification.service'; // ajusta si cambia
import { EditorModule } from 'primeng/editor';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { QUESTION_MEDIA_TYPES,
  DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG,
  QUESTION_EDITOR_STYLE } from './../../../../../../config/question.config';
  import { SelectModule } from 'primeng/select';
  import { Store } from '@ngrx/store';
import { updateActivity } from '../../../../../../state';
@Component({
  selector: 'app-question-builder',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    EditorModule,
    ToggleSwitchModule,
    InputTextModule,
    TextareaModule,
    SelectModule],
  templateUrl: './question-builder.component.html',
  styleUrl: './question-builder.component.scss'
})
export class QuestionBuilderComponent {
  question: QuestionModel = {
    text: '',
    description: '',
    type: 'multiple_choice',
    media: [],
    answers: []
  };

  mediaTypes = [...QUESTION_MEDIA_TYPES]; // Hacemos una copia mutable
  selectedMediaType = this.mediaTypes[0].value;
  editorStyle = QUESTION_EDITOR_STYLE;
  showTranslation = false;

  constructor(private store: Store,
    private notification: NotificationService) {}

    onUpload(event: any) {
      const file = event.files[0];
      const fakeUrl = 'https://www.primefaces.org/cdn/api/' + file.name;

      const newMedia: MediaModel = {
        type: this.selectedMediaType,
        url: fakeUrl
      };

      const updated = {
        ...this.question,
        media: [...(this.question.media ?? []), newMedia]
      };

      this.question = updated;

      this.store.dispatch(updateActivity({
        changes: {
          question: updated
        }
      }));

      this.notification.showSuccess('Archivo subido correctamente');
    }

  uploadManually(fu: any) {
    fu.upload();
  }

  updateField<K extends keyof QuestionModel>(field: K, value: QuestionModel[K]) {
    const updated = {
      ...this.question,
      [field]: value
    };

    this.question = updated;

    this.store.dispatch(updateActivity({
      changes: {
        question: updated
      }
    }));
  }

  updateTranslation(value: string) {
    const prev = this.question.translation ?? {
      translatedText: '',
      sourceLanguageCode: DEFAULT_SOURCE_LANG,
      targetLanguageCode: DEFAULT_TARGET_LANG,
      explanation: '',
      media: []
    };

    const updated = {
      ...this.question,
      translation: {
        ...prev,
        translatedText: value
      }
    };

    this.question = updated;

    this.store.dispatch(updateActivity({
      changes: {
        question: updated
      }
    }));
  }
}
