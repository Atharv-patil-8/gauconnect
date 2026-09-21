import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-host',
  imports: [],
  templateUrl: './toast-host.html',
  styleUrl: './toast-host.css'
})
export class ToastHost {
  protected readonly toasts = inject(ToastService).toasts;
  private readonly toastService = inject(ToastService);

  iconFor(kind: string): string {
    switch (kind) {
      case 'success': return '✅';
      case 'warn':    return '⚠️';
      case 'error':   return '❌';
      case 'info':    return 'ℹ️';
      default:        return 'ℹ️';
    }
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}