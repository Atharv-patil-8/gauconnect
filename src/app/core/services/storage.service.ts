import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Thin wrapper around localStorage with JSON serialization
 * and a safe in-memory fallback for SSR / non-browser environments.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private platformId = inject(PLATFORM_ID);
  private memory = new Map<string, string>();

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get<T>(key: string): T | null {
    try {
      const raw = this.isBrowser
        ? localStorage.getItem(key)
        : this.memory.get(key) ?? null;
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const raw = JSON.stringify(value);
      if (this.isBrowser) {
        localStorage.setItem(key, raw);
      } else {
        this.memory.set(key, raw);
      }
    } catch {
      // Ignore quota errors silently
    }
  }

  remove(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    } else {
      this.memory.delete(key);
    }
  }

  clearAll(prefix: string): void {
    if (this.isBrowser) {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
      keys.forEach(k => localStorage.removeItem(k));
    } else {
      for (const k of Array.from(this.memory.keys())) {
        if (k.startsWith(prefix)) this.memory.delete(k);
      }
    }
  }
}