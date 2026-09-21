// =============================================
// GauConnect Domain Models
// =============================================

export type Role = 'Collector' | 'Farmer' | 'Vet' | 'DairyAdmin';

export type AnimalType = 'Cow' | 'Buffalo';

export type Shift = 'Morning' | 'Evening';

export type SyncStatus = 'synced' | 'pending' | 'failed';

// ---------- Farmer ----------
export interface Farmer {
  id: string;              // "GKL-4582"
  name: string;
  village: string;
  mobile: string;
  societyCode: string;     // "GKL-AN-2841"
  joinedAt: string;        // ISO date
  status: 'active' | 'inactive';
}

// ---------- Animal (Cow / Buffalo) ----------
export interface Animal {
  id: string;              // Internal UUID
  registrationNumber: string;  // The "registered number" per animal — e.g. "GJ-1042"
  farmerId: string;        // Which farmer owns this animal
  type: AnimalType;
  breed: string;
  ageYears: number;
  status: 'Lactating' | 'Dry' | 'Pregnant' | 'Heifer' | 'Calf';
}

// ---------- Milk Rates (set by admin) ----------
export interface MilkRates {
  cowFatRate: number;      // ₹ per fat point
  cowSnfRate: number;      // ₹ per SNF point
  buffaloFatRate: number;  // ₹ per fat point
  buffaloSnfRate: number;  // ₹ per SNF point
  updatedAt: string;       // ISO date
  updatedBy: string;       // Role name who last changed it
}

// ---------- Permissions (set by admin) ----------
export interface Permissions {
  collectorCanEditRates: boolean;
}

// ---------- Milk Transaction ----------
export interface MilkTransaction {
  id: string;
  farmerId: string;
  animalId: string;
  animalRegistrationNumber: string;
  animalType: AnimalType;
  collectorId: string;     // for demo, just "collector-01"
  shift: Shift;
  date: string;            // ISO date (YYYY-MM-DD)
  timestamp: string;       // Full ISO datetime
  quantity: number;        // liters
  fat: number;             // %
  snf: number;             // %
  rate: number;            // ₹ per liter
  amount: number;          // ₹ total
  syncStatus: SyncStatus;
}