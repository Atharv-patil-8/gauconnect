import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DairyService } from '../../../core/services/dairy.service';
import { CollectionFlowService } from '../../../core/services/collection-flow.service';
import { ToastService } from '../../../core/services/toast.service';
import { Farmer } from '../../../core/models';

@Component({
  selector: 'app-scan-farmer',
  imports: [FormsModule],
  templateUrl: './scan-farmer.html',
  styleUrl: './scan-farmer.css'
})
export class ScanFarmer {
  private dairy = inject(DairyService);
  private flow = inject(CollectionFlowService);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly searchQuery = signal('');
  readonly scanning = signal(false);
  readonly showBrowse = signal(false);

  readonly allFarmers = this.dairy.farmers;

  readonly filteredFarmers = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.allFarmers();
    return this.allFarmers().filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q) ||
      f.mobile.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
    );
  });

  onSimulateScan(): void {
    this.scanning.set(true);

    // Simulate a 1.2s scan delay
    setTimeout(() => {
      const farmers = this.allFarmers();
      if (farmers.length === 0) {
        this.scanning.set(false);
        this.toast.error('No farmers registered yet');
        return;
      }
      const random = farmers[Math.floor(Math.random() * farmers.length)];
      this.scanning.set(false);
      this.selectFarmer(random);
    }, 1200);
  }

  onBrowse(): void {
    this.showBrowse.set(true);
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }

  selectFarmer(farmer: Farmer): void {
    this.flow.start(farmer);
    this.toast.success(`Farmer identified: ${farmer.name}`);
    this.router.navigate(['/collector/animal', farmer.id]);
  }

  onBack(): void {
    this.flow.reset();
    this.router.navigate(['/collector']);
  }
}