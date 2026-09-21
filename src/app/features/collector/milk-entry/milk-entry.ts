import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DairyService } from '../../../core/services/dairy.service';
import { CollectionFlowService } from '../../../core/services/collection-flow.service';
import { ToastService } from '../../../core/services/toast.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-milk-entry',
  imports: [FormsModule,DecimalPipe],
  templateUrl: './milk-entry.html',
  styleUrl: './milk-entry.css'
})
export class MilkEntry {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dairy = inject(DairyService);
  private flow = inject(CollectionFlowService);
  private toast = inject(ToastService);

  readonly animalId = this.route.snapshot.paramMap.get('animalId') ?? '';
  readonly animal = computed(() => this.dairy.findAnimal(this.animalId));
  readonly farmer = computed(() => {
    const a = this.animal();
    return a ? this.dairy.findFarmer(a.farmerId) : undefined;
  });

  readonly quantity = signal<number>(0);
  readonly fat = signal<number>(0);
  readonly snf = signal<number>(0);

  // Per-animal type rates (for showing in the summary)
  readonly rates = this.dairy.rates;

  readonly rate = computed(() => {
    const a = this.animal();
    if (!a || this.fat() <= 0 || this.snf() <= 0) return 0;
    return this.dairy.calculateRate(a.type, this.fat(), this.snf());
  });

  readonly amount = computed(() => {
    const a = this.animal();
    if (!a || this.quantity() <= 0 || this.rate() <= 0) return 0;
    return Math.round(this.quantity() * this.rate() * 100) / 100;
  });

  readonly canContinue = computed(() =>
    this.quantity() > 0 && this.fat() > 0 && this.snf() > 0
  );

  setQuantity(v: string): void { this.quantity.set(parseFloat(v) || 0); }
  setFat(v: string): void      { this.fat.set(parseFloat(v) || 0); }
  setSnf(v: string): void      { this.snf.set(parseFloat(v) || 0); }

  onContinue(): void {
    if (!this.canContinue()) return;
    this.flow.setMilkValues(this.quantity(), this.fat(), this.snf());
    this.router.navigate(['/collector/confirm']);
  }

  onBack(): void {
    const a = this.animal();
    if (a) this.router.navigate(['/collector/animal', a.farmerId]);
  }
}