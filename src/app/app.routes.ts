import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'collector', pathMatch: 'full' },

  // Collector
  {
    path: 'collector',
    loadComponent: () =>
      import('./features/collector/collector').then(m => m.Collector)
  },
  {
    path: 'collector/rates',
    loadComponent: () =>
      import('./features/collector/rate-view').then(m => m.RateView)
  },
  {
    path: 'collector/scan',
    loadComponent: () =>
      import('./features/collector/scan-farmer/scan-farmer')
        .then(m => m.ScanFarmer)
  },
  {
    path: 'collector/animal/:farmerId',
    loadComponent: () =>
      import('./features/collector/select-animal/select-animal')
        .then(m => m.SelectAnimal)
  },
  {
    path: 'collector/entry/:animalId',
    loadComponent: () =>
      import('./features/collector/milk-entry/milk-entry')
        .then(m => m.MilkEntry)
  },
  {
    path: 'collector/confirm',
    loadComponent: () =>
      import('./features/collector/confirm/confirm').then(m => m.Confirm)
  },
  {
    path: 'collector/success/:id',
    loadComponent: () =>
      import('./features/collector/success/success').then(m => m.Success)
  },

  // Admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin').then(m => m.Admin)
  },
  {
    path: 'admin/rates',
    loadComponent: () =>
      import('./features/admin/rate-settings').then(m => m.RateSettings)
  },

  // Placeholders
  {
    path: 'farmer',
    loadComponent: () =>
      import('./features/farmer/farmer').then(m => m.Farmer)
  },
  {
    path: 'vet',
    loadComponent: () =>
      import('./features/vet/vet').then(m => m.Vet)
  },

  { path: '**', redirectTo: 'collector' }
];