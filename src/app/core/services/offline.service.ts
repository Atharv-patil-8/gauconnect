import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class OfflineService {
  private platformId = inject(PLATFORM_ID);

  readonly isOnline = signal(true);
  readonly pendingCount = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline.set(navigator.onLine);
      this.attachListeners();
    }
  }

  /** Simulate a sync — real backend call goes here later */
  async syncAll(): Promise<{ synced: number; failed: number }> {
    if (!this.isOnline()) return { synced: 0, failed: 0 };
    await new Promise(resolve => setTimeout(resolve, 800));
    const count = this.pendingCount();
    this.pendingCount.set(0);
    return { synced: count, failed: 0 };
  }

  setPending(count: number): void {
    this.pendingCount.set(count);
  }

  private attachListeners(): void {
    window.addEventListener('online', () => this.isOnline.set(true));
    window.addEventListener('offline', () => this.isOnline.set(false));
  }
}