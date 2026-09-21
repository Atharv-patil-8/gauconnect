import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { StorageService } from './storage.service';
import {
    Farmer, Animal, MilkRates, Permissions, MilkTransaction,
    AnimalType, Shift, Role
} from '../models';
import {
    SEED_FARMERS, SEED_ANIMALS, SEED_RATES, SEED_PERMISSIONS
} from './seed-data';

const KEYS = {
    farmers: 'gauconnect-farmers',
    animals: 'gauconnect-animals',
    rates: 'gauconnect-rates',
    permissions: 'gauconnect-permissions',
    transactions: 'gauconnect-transactions'
};

@Injectable({ providedIn: 'root' })
export class DairyService {
    private storage = inject(StorageService);

    // ---------- Signals ----------
    readonly farmers = signal<Farmer[]>([]);
    readonly animals = signal<Animal[]>([]);
    readonly rates = signal<MilkRates>(SEED_RATES);
    readonly permissions = signal<Permissions>(SEED_PERMISSIONS);
    readonly transactions = signal<MilkTransaction[]>([]);

    // ---------- Derived ----------
    readonly todayTransactions = computed(() => {
        const today = new Date().toISOString().slice(0, 10);
        return this.transactions().filter(t => t.date === today);
    });

    constructor() {
        this.load();

        // Auto-persist on change
        effect(() => this.storage.set(KEYS.farmers, this.farmers()));
        effect(() => this.storage.set(KEYS.animals, this.animals()));
        effect(() => this.storage.set(KEYS.rates, this.rates()));
        effect(() => this.storage.set(KEYS.permissions, this.permissions()));
        effect(() => this.storage.set(KEYS.transactions, this.transactions()));
    }

    // ---------- Load / Reset ----------
    private load(): void {
        const farmers = this.storage.get<Farmer[]>(KEYS.farmers);
        const animals = this.storage.get<Animal[]>(KEYS.animals);
        const rates = this.storage.get<MilkRates>(KEYS.rates);
        const permissions = this.storage.get<Permissions>(KEYS.permissions);
        const transactions = this.storage.get<MilkTransaction[]>(KEYS.transactions);

        this.farmers.set(farmers ?? SEED_FARMERS);
        this.animals.set(animals ?? SEED_ANIMALS);
        this.rates.set(rates ?? SEED_RATES);
        this.permissions.set(permissions ?? SEED_PERMISSIONS);
        this.transactions.set(transactions ?? []);
    }

    resetDemoData(): void {
        this.storage.clearAll('gauconnect-');
        this.farmers.set(SEED_FARMERS);
        this.animals.set(SEED_ANIMALS);
        this.rates.set(SEED_RATES);
        this.permissions.set(SEED_PERMISSIONS);
        this.transactions.set([]);
    }

    // ---------- Lookups ----------
    findFarmer(id: string): Farmer | undefined {
        return this.farmers().find(f => f.id === id);
    }

    findFarmerByMobile(mobile: string): Farmer | undefined {
        const cleaned = mobile.replace(/\D/g, '');
        return this.farmers().find(
            f => f.mobile.replace(/\D/g, '').endsWith(cleaned.slice(-10))
        );
    }

    animalsForFarmer(farmerId: string): Animal[] {
        return this.animals().filter(a => a.farmerId === farmerId);
    }

    findAnimal(id: string): Animal | undefined {
        return this.animals().find(a => a.id === id);
    }

    // ---------- Rate Calculation ----------
    /** Rate per liter based on animal type, fat %, and SNF % */
    calculateRate(animalType: AnimalType, fat: number, snf: number): number {
        const r = this.rates();
        if (animalType === 'Cow') {
            return this.round2(fat * r.cowFatRate + snf * r.cowSnfRate);
        }
        return this.round2(fat * r.buffaloFatRate + snf * r.buffaloSnfRate);
    }

    calculateAmount(
        animalType: AnimalType, quantity: number, fat: number, snf: number
    ): number {
        return this.round2(quantity * this.calculateRate(animalType, fat, snf));
    }

    // ---------- Mutations ----------
    updateRates(newRates: Omit<MilkRates, 'updatedAt' | 'updatedBy'>, by: Role): void {
        this.rates.set({
            ...newRates,
            updatedAt: new Date().toISOString(),
            updatedBy: by
        });
    }

    updatePermissions(newPerms: Permissions): void {
        this.permissions.set({ ...newPerms });
    }

    addTransaction(
        t: Omit<MilkTransaction, 'id' | 'date' | 'timestamp' | 'syncStatus'>
    ): MilkTransaction {
        const now = new Date();
        const tx: MilkTransaction = {
            ...t,
            id: this.generateId(),
            date: now.toISOString().slice(0, 10),
            timestamp: now.toISOString(),
            syncStatus: 'pending'
        };
        this.transactions.update(list => [tx, ...list]);
        return tx;
    }

    currentShift(): Shift {
        return new Date().getHours() < 12 ? 'Morning' : 'Evening';
    }

    // ---------- Helpers ----------
    private round2(n: number): number {
        return Math.round(n * 100) / 100;
    }
    private generateId(): string {
        try {
            if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
                return crypto.randomUUID();
            }
        } catch {
            // Fall through
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
}