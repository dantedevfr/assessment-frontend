import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MediaModel } from '../../../../../../models/media.model';
import { QuestionModel } from '../../../../../../models/question.model'; // ajusta la ruta si es necesario
import { NotificationService } from '../../../../../../../../core/services/notification.service'; // ajusta si cambia
import { QuestionType } from '../../../../../../models/question.model';
import { EditorModule } from 'primeng/editor';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

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
    TextareaModule],
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

  selectedMediaType: 'audio' | 'video' | 'image' = 'image';
  showTranslation = false;

  constructor(private notification: NotificationService) {}

  onUpload(event: any) {
    const file = event.files[0];
    const fakeUrl = 'https://www.primefaces.org/cdn/api/' + file.name;

    const newMedia: MediaModel = {
      type: this.selectedMediaType,
      url: fakeUrl
    };

    this.question.media = [...(this.question.media ?? []), newMedia];
    this.notification.showSuccess('Archivo subido correctamente');
  }

  uploadManually(fu: any) {
    fu.upload();
  }

  updateField<K extends keyof QuestionModel>(field: K, value: QuestionModel[K]) {
    this.question = {
      ...this.question,
      [field]: value
    };
  }

  updateTranslation(value: string) {
    const prev = this.question.translation ?? {
      translatedText: '',
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es'
    };

    this.question.translation = {
      ...prev,
      translatedText: value
    };
  }
}
