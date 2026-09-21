import { Farmer, Animal, MilkRates, Permissions } from '../models';

export const SEED_RATES: MilkRates = {
  cowFatRate: 7.5,
  cowSnfRate: 4.5,
  buffaloFatRate: 8.0,
  buffaloSnfRate: 5.0,
  updatedAt: new Date().toISOString(),
  updatedBy: 'DairyAdmin'
};

export const SEED_PERMISSIONS: Permissions = {
  collectorCanEditRates: false
};

export const SEED_FARMERS: Farmer[] = [
  {
    id: 'GKL-4582', name: 'Ramesh Patel', village: 'Anand',
    mobile: '+91 98765 43210', societyCode: 'GKL-AN-2841',
    joinedAt: '2024-01-15', status: 'active'
  },
  {
    id: 'GKL-4583', name: 'Suresh Bhai', village: 'Kheda',
    mobile: '+91 98765 43211', societyCode: 'GKL-AN-2841',
    joinedAt: '2024-02-20', status: 'active'
  },
  {
    id: 'GKL-4584', name: 'Meena Ben', village: 'Borsad',
    mobile: '+91 98765 43212', societyCode: 'GKL-AN-2841',
    joinedAt: '2023-11-05', status: 'active'
  },
  {
    id: 'GKL-4585', name: 'Kirit Bhai', village: 'Petlad',
    mobile: '+91 98765 43213', societyCode: 'GKL-AN-2841',
    joinedAt: '2024-03-10', status: 'active'
  },
  {
    id: 'GKL-4586', name: 'Jayesh Bhai', village: 'Umreth',
    mobile: '+91 98765 43214', societyCode: 'GKL-AN-2841',
    joinedAt: '2023-08-22', status: 'active'
  },
  {
    id: 'GKL-4587', name: 'Nita Ben', village: 'Tarapur',
    mobile: '+91 98765 43215', societyCode: 'GKL-AN-2841',
    joinedAt: '2024-04-01', status: 'active'
  },
  {
    id: 'GKL-4588', name: 'Bhavesh Bhai', village: 'Anand',
    mobile: '+91 98765 43216', societyCode: 'GKL-AN-2841',
    joinedAt: '2023-12-12', status: 'active'
  },
  {
    id: 'GKL-4589', name: 'Rekha Ben', village: 'Kheda',
    mobile: '+91 98765 43217', societyCode: 'GKL-AN-2841',
    joinedAt: '2024-05-18', status: 'active'
  }
];

export const SEED_ANIMALS: Animal[] = [
  // Ramesh Patel — 1 cow + 1 buffalo (matches your example exactly)
  {
    id: 'animal-001', registrationNumber: 'GJ-1042',
    farmerId: 'GKL-4582', type: 'Cow', breed: 'Gir',
    ageYears: 4, status: 'Lactating'
  },
  {
    id: 'animal-002', registrationNumber: 'GJ-1043',
    farmerId: 'GKL-4582', type: 'Buffalo', breed: 'Murrah',
    ageYears: 5, status: 'Lactating'
  },

  // Suresh Bhai — 2 cows + 1 buffalo
  {
    id: 'animal-003', registrationNumber: 'GJ-1044',
    farmerId: 'GKL-4583', type: 'Cow', breed: 'Sahiwal',
    ageYears: 3, status: 'Lactating'
  },
  {
    id: 'animal-004', registrationNumber: 'GJ-1045',
    farmerId: 'GKL-4583', type: 'Cow', breed: 'HF Cross',
    ageYears: 4, status: 'Lactating'
  },
  {
    id: 'animal-005', registrationNumber: 'GJ-1046',
    farmerId: 'GKL-4583', type: 'Buffalo', breed: 'Jaffarabadi',
    ageYears: 6, status: 'Lactating'
  },

  // Meena Ben — 1 cow
  {
    id: 'animal-006', registrationNumber: 'GJ-1047',
    farmerId: 'GKL-4584', type: 'Cow', breed: 'Gir',
    ageYears: 5, status: 'Lactating'
  },

  // Kirit Bhai — 1 buffalo
  {
    id: 'animal-007', registrationNumber: 'GJ-1048',
    farmerId: 'GKL-4585', type: 'Buffalo', breed: 'Murrah',
    ageYears: 4, status: 'Lactating'
  },

  // Jayesh Bhai — 2 cows
  {
    id: 'animal-008', registrationNumber: 'GJ-1049',
    farmerId: 'GKL-4586', type: 'Cow', breed: 'Sahiwal',
    ageYears: 4, status: 'Lactating'
  },
  {
    id: 'animal-009', registrationNumber: 'GJ-1050',
    farmerId: 'GKL-4586', type: 'Cow', breed: 'Gir',
    ageYears: 3, status: 'Lactating'
  },

  // Nita Ben — 1 buffalo
  {
    id: 'animal-010', registrationNumber: 'GJ-1051',
    farmerId: 'GKL-4587', type: 'Buffalo', breed: 'Jaffarabadi',
    ageYears: 5, status: 'Lactating'
  },

  // Bhavesh Bhai — 1 cow + 1 buffalo
  {
    id: 'animal-011', registrationNumber: 'GJ-1052',
    farmerId: 'GKL-4588', type: 'Cow', breed: 'HF Cross',
    ageYears: 3, status: 'Lactating'
  },
  {
    id: 'animal-012', registrationNumber: 'GJ-1053',
    farmerId: 'GKL-4588', type: 'Buffalo', breed: 'Murrah',
    ageYears: 4, status: 'Lactating'
  },

  // Rekha Ben — 1 cow
  {
    id: 'animal-013', registrationNumber: 'GJ-1054',
    farmerId: 'GKL-4589', type: 'Cow', breed: 'Gir',
    ageYears: 6, status: 'Lactating'
  }
];