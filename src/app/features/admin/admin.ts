import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DairyService } from '../../core/services/dairy.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private dairy = inject(DairyService);
  private toast = inject(ToastService);

  readonly permissions = this.dairy.permissions;

  toggleCollectorRateEdit(): void {
    const current = this.permissions().collectorCanEditRates;
    this.dairy.updatePermissions({ collectorCanEditRates: !current });

    if (!current) {
      this.toast.success('Collector rate editing enabled');
    } else {
      this.toast.warn('Collector rate editing disabled');
    }
  }
}
