import { Injectable, signal, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { DairyService } from './dairy.service';
import { Role } from '../models';

const ROLE_KEY = 'gauconnect-current-role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private dairy = inject(DairyService);

  readonly role = signal<Role>('Collector');

  readonly isAdmin = computed(() => this.role() === 'DairyAdmin');
  readonly isCollector = computed(() => this.role() === 'Collector');

  /** Whether the current user can edit rates */
  readonly canEditRates = computed(() => {
    if (this.role() === 'DairyAdmin') return true;
    if (this.role() === 'Collector') {
      return this.dairy.permissions().collectorCanEditRates;
    }
    return false;
  });

  constructor() {
    const saved = this.storage.get<Role>(ROLE_KEY);
    if (saved) this.role.set(saved);
  }

  setRole(role: Role): void {
    this.role.set(role);
    this.storage.set(ROLE_KEY, role);
  }

  cycleRole(): void {
    const order: Role[] = ['Collector', 'DairyAdmin', 'Farmer', 'Vet'];
    const idx = order.indexOf(this.role());
    this.setRole(order[(idx + 1) % order.length]);
  }
}