import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DairyService } from '../../../core/services/dairy.service';
import { CollectionFlowService } from '../../../core/services/collection-flow.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-confirm',
  imports: [DecimalPipe],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css'
})
export class Confirm {
  private router = inject(Router);
  private dairy = inject(DairyService);
  readonly flow = inject(CollectionFlowService);
  private toast = inject(ToastService);

  readonly rate = computed(() => {
    const a = this.flow.animal();
    if (!a) return 0;
    return this.dairy.calculateRate(a.type, this.flow.fat(), this.flow.snf());
  });

  readonly amount = computed(() => {
    const a = this.flow.animal();
    if (!a) return 0;
    return Math.round(this.flow.quantity() * this.rate() * 100) / 100;
  });

  readonly submitting = signal(false);

  onEdit(): void {
    this.router.navigate(['/collector/entry', this.flow.animal()?.id]);
  }

  onConfirm(): void {
    const farmer = this.flow.farmer();
    const animal = this.flow.animal();
    if (!farmer || !animal) {
      this.toast.error('Missing farmer or animal data');
      return;
    }

    this.submitting.set(true);

    // Simulate a small delay so the user sees the spinner
    setTimeout(() => {
      const tx = this.dairy.addTransaction({
        farmerId: farmer.id,
        animalId: animal.id,
        animalRegistrationNumber: animal.registrationNumber,
        animalType: animal.type,
        collectorId: 'collector-01',
        shift: this.dairy.currentShift(),
        quantity: this.flow.quantity(),
        fat: this.flow.fat(),
        snf: this.flow.snf(),
        rate: this.rate(),
        amount: this.amount()
      });

      this.submitting.set(false);
      this.toast.success(`Collection saved: ₹${this.amount().toFixed(2)}`);

      // Navigate to success with the transaction ID
      this.router.navigate(['/collector/success', tx.id]);
    }, 400);
  }

  onCancel(): void {
    this.flow.reset();
    this.router.navigate(['/collector']);
  }
}