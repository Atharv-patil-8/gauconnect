import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DairyService } from '../../../core/services/dairy.service';
import { CollectionFlowService } from '../../../core/services/collection-flow.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-success',
  imports: [DecimalPipe],
  templateUrl: './success.html',
  styleUrl: './success.css'
})
export class Success {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dairy = inject(DairyService);
  private flow = inject(CollectionFlowService);
  private toast = inject(ToastService);

  readonly transactionId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly transaction = computed(() =>
    this.dairy.transactions().find(t => t.id === this.transactionId)
  );

  readonly farmer = computed(() => {
    const tx = this.transaction();
    return tx ? this.dairy.findFarmer(tx.farmerId) : undefined;
  });

  readonly timeString = computed(() => {
    const tx = this.transaction();
    if (!tx) return '';
    return new Date(tx.timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  });

  onNextFarmer(): void {
    this.flow.reset();
    this.router.navigate(['/collector/scan']);
  }

  onDashboard(): void {
    this.flow.reset();
    this.router.navigate(['/collector']);
  }

  onPrint(): void {
    this.toast.info('Print slip — coming soon');
  }

  onSendSms(): void {
    const f = this.farmer();
    if (!f) return;
    this.toast.success(`SMS sent to ${f.mobile}`);
  }
}