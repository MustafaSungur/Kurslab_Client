import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ToastModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Input() dialogHeader: string = 'Onay Gerekli';
  @Input() dialogMessage: string =
    'Bu işlemi yapmak istediğinizden emin misiniz?';
  @Input() acceptButtonLabel: string = 'Onayla';
  @Output() onAccept: EventEmitter<void> = new EventEmitter<void>();
  @Input() confirmButtonLabel;
  @Input() icon: string;
  constructor(private confirmationService: ConfirmationService) {}

  confirm() {
    this.confirmationService.confirm({
      accept: () => this.onAcceptDialog(),
      reject: () => {},
    });
  }

  onAcceptDialog() {
    this.onAccept.emit();
  }
}
