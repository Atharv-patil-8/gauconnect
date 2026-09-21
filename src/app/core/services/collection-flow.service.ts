import { Injectable, signal, computed } from '@angular/core';
import { Farmer, Animal } from '../models';

@Injectable({ providedIn: 'root' })
export class CollectionFlowService {
  readonly farmer = signal<Farmer | null>(null);
  readonly animal = signal<Animal | null>(null);

  readonly quantity = signal<number>(0);
  readonly fat = signal<number>(0);
  readonly snf = signal<number>(0);

  readonly isActive = computed(() => this.farmer() !== null);

  start(farmer: Farmer): void {
    this.farmer.set(farmer);
    this.animal.set(null);
    this.quantity.set(0);
    this.fat.set(0);
    this.snf.set(0);
  }

  selectAnimal(animal: Animal): void {
    this.animal.set(animal);
  }

  setMilkValues(quantity: number, fat: number, snf: number): void {
    this.quantity.set(quantity);
    this.fat.set(fat);
    this.snf.set(snf);
  }

  reset(): void {
    this.farmer.set(null);
    this.animal.set(null);
    this.quantity.set(0);
    this.fat.set(0);
    this.snf.set(0);
  }
}