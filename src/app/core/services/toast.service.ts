import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'warn' | 'error' | 'info';

export interface Toast {
    id: string;
    kind: ToastKind;
    message: string;
    createdAt: number;
}

const AUTO_DISMISS_MS = 3000;

@Injectable({ providedIn: 'root' })
export class ToastService {
    readonly toasts = signal<Toast[]>([]);

    success(message: string): void { this.push('success', message); }
    warn(message: string): void { this.push('warn', message); }
    error(message: string): void { this.push('error', message); }
    info(message: string): void { this.push('info', message); }

    dismiss(id: string): void {
        this.toasts.update(list => list.filter(t => t.id !== id));
    }

    private push(kind: ToastKind, message: string): void {
        const toast: Toast = {
            id: this.generateId(),
            kind,
            message,
            createdAt: Date.now()
        };
        this.toasts.update(list => [toast, ...list]);
        setTimeout(() => this.dismiss(toast.id), AUTO_DISMISS_MS);
    }

    /**
     * Generate a unique ID that works in any context (HTTP, HTTPS, localhost).
     * Falls back gracefully when crypto.randomUUID() is unavailable.
     */
    private generateId(): string {
        try {
            if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
                return crypto.randomUUID();
            }
        } catch {
            // Fall through to fallback
        }
        return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
}