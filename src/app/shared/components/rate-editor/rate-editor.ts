import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DairyService } from '../../../core/services/dairy.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { MilkRates, Role } from '../../../core/models';

interface RateField {
  key: keyof Omit<MilkRates, 'updatedAt' | 'updatedBy'>;
  label: string;
  helper: string;
  value: number;
  icon: string;
}

@Component({
  selector: 'app-rate-editor',
  imports: [FormsModule],
  templateUrl: './rate-editor.html',
  styleUrl: './rate-editor.css'
})
export class RateEditor {
  private dairy = inject(DairyService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  readonly adminMode = input<boolean>(false);

  readonly canEdit = computed(() =>
    this.adminMode() ? this.auth.isAdmin() : this.auth.canEditRates()
  );

  readonly lastUpdated = computed(() => {
    const r = this.dairy.rates();
    return {
      at: new Date(r.updatedAt).toLocaleString(),
      by: r.updatedBy
    };
  });

  readonly cowFields = signal<RateField[]>([
    { key: 'cowFatRate',     label: 'Cow Fat Rate',     helper: '₹ per fat point',  value: 0, icon: '🧪' },
    { key: 'cowSnfRate',     label: 'Cow SNF Rate',     helper: '₹ per SNF point',  value: 0, icon: '💧' }
  ]);

  readonly buffaloFields = signal<RateField[]>([
    { key: 'buffaloFatRate', label: 'Buffalo Fat Rate', helper: '₹ per fat point',  value: 0, icon: '🧪' },
    { key: 'buffaloSnfRate', label: 'Buffalo SNF Rate', helper: '₹ per SNF point',  value: 0, icon: '💧' }
  ]);

  constructor() {
    queueMicrotask(() => this.syncFieldsFromRates());
  }

  private syncFieldsFromRates(): void {
    const r = this.dairy.rates();
    this.cowFields.update(fields =>
      fields.map(f => ({ ...f, value: r[f.key] as number }))
    );
    this.buffaloFields.update(fields =>
      fields.map(f => ({ ...f, value: r[f.key] as number }))
    );
  }

  updateField(list: 'cow' | 'buffalo', key: string, value: string): void {
    const numeric = parseFloat(value) || 0;
    const updater = (fields: RateField[]) =>
      fields.map(f => (f.key === key ? { ...f, value: numeric } : f));

    if (list === 'cow') this.cowFields.update(updater);
    else this.buffaloFields.update(updater);
  }

  onSave(): void {
    if (!this.canEdit()) return;

    const cow = this.cowFields();
    const buf = this.buffaloFields();

    this.dairy.updateRates(
      {
        cowFatRate: cow[0].value,
        cowSnfRate: cow[1].value,
        buffaloFatRate: buf[0].value,
        buffaloSnfRate: buf[1].value
      },
      this.auth.role() as Role
    );

    this.toast.success('Rates saved successfully');
  }

  onReset(): void {
    this.syncFieldsFromRates();
    this.toast.info('Reverted to saved values');
  }
}