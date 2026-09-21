import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OfflineService } from '../../core/services/offline.service';
import { DairyService } from '../../core/services/dairy.service';

interface Stat {
  label: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-collector',
  imports: [RouterLink],
  templateUrl: './collector.html',
  styleUrl: './collector.css'
})
export class Collector {
  private offline = inject(OfflineService);
  private router = inject(Router);
  private dairy = inject(DairyService);

  readonly isOnline = this.offline.isOnline;
  readonly pendingCount = this.offline.pendingCount;

  readonly currentShift = computed(() => {
    const hour = new Date().getHours();
    return hour < 12 ? 'MORNING SHIFT' : 'EVENING SHIFT';
  });

  readonly stats = computed<Stat[]>(() => {
    const today = this.dairy.todayTransactions();
    const farmersToday = new Set(today.map(t => t.farmerId)).size;
    const totalLiters = today.reduce((sum, t) => sum + t.quantity, 0);
    const totalAmount = today.reduce((sum, t) => sum + t.amount, 0);

    return [
      { label: 'Farmers', value: `${farmersToday}`, icon: '👥' },
      { label: 'Milk',    value: `${totalLiters.toFixed(1)} L`, icon: '🥛' },
      { label: 'Amount',  value: `₹${totalAmount.toFixed(0)}`, icon: '₹' }
    ];
  });

  onScanFarmer(): void {
    this.router.navigate(['/collector/scan']);
  }

  onNewFarmer(): void {
    // Placeholder — will be built in a future part
    this.router.navigate(['/collector/scan']);
  }

  onRegisterAnimal(): void {
    // Placeholder
  }

  onFarmerList(): void {
    // Placeholder
  }

  onTransactions(): void {
    // Placeholder
  }

  async onSync() {
    const result = await this.offline.syncAll();
    console.log(`Synced: ${result.synced}, Failed: ${result.failed}`);
  }
}