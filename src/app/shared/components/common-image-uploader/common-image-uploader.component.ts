import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-common-image-uploader',
  templateUrl: './common-image-uploader.component.html',
  styleUrls: ['./common-image-uploader.component.scss'],
  standalone: true,
  imports: [CommonModule,FileUploadModule]
})
export class CommonImageUploaderComponent {
  @Input() imageUrl: string | null = null;
  @Output() imageChange = new EventEmitter<File | null>();

  onSelect(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      this.imageChange.emit(file);
    }
  }

  onClear(): void {
    this.imageUrl = null;
    this.imageChange.emit(null);
  }
}
