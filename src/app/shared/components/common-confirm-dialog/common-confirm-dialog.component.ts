import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-common-confirm-dialog',
  imports: [CommonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './common-confirm-dialog.component.html',
  styleUrl: './common-confirm-dialog.component.scss'
})
export class CommonConfirmDialogComponent {
  @Input() header = '¿Estás seguro?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Input() acceptLabel = 'Aceptar';
  @Input() rejectLabel = 'Cancelar';
  @Input() icon = 'pi pi-exclamation-triangle';

  @Output() accept = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  show() {
    this.confirmationService.confirm({
      header: this.header,
      message: this.message,
      icon: this.icon,
      acceptLabel: this.acceptLabel,
      rejectLabel: this.rejectLabel,
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.accept.emit(),
      reject: () => this.reject.emit()
    });
  }
}
