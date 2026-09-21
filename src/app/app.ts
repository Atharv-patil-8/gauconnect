import { Role } from './core/models';
import { ToastHost } from './shared/components/toast-host/toast-host';
import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { OfflineService } from './core/services/offline.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,ToastHost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gauconnect');
  private offline = inject(OfflineService);
  private auth = inject(AuthService);

  readonly isOnline = this.offline.isOnline;
  readonly pendingCount = this.offline.pendingCount;
  readonly role = this.auth.role;

  readonly navItems = computed(() => {
    switch (this.role()) {
      case 'Collector':
        return [
          { path: '/collector', label: 'Home', icon: '🏠' },
          { path: '/collector/rates', label: 'Rates', icon: '💹' },
          { path: '/collector/farmers', label: 'Farmers', icon: '👥' },
          { path: '/collector/animals', label: 'Animals', icon: '🐄' }
        ];
      case 'DairyAdmin':
        return [
          { path: '/admin', label: 'Admin', icon: '🔐' },
          { path: '/admin/rates', label: 'Rates', icon: '💹' },
          { path: '/collector', label: 'View', icon: '👁️' },
          { path: '/admin', label: 'Home', icon: '🏠' }
        ];
      case 'Farmer':
        return [
          { path: '/farmer', label: 'Home', icon: '🏠' },
          { path: '/farmer/herd', label: 'Herd', icon: '🐄' },
          { path: '/farmer/milk', label: 'Milk', icon: '🥛' },
          { path: '/farmer/settings', label: 'More', icon: '⚙️' }
        ];
      case 'Vet':
        return [
          { path: '/vet', label: 'Home', icon: '🏠' },
          { path: '/vet/patients', label: 'Patients', icon: '🐄' },
          { path: '/vet/visits', label: 'Visits', icon: '📋' },
          { path: '/vet/settings', label: 'More', icon: '⚙️' }
        ];
    }
  });

  cycleRole(): void {
    this.auth.cycleRole();
  }
}
