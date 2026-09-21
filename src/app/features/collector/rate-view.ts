import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RateEditor } from '../../shared/components/rate-editor/rate-editor';

@Component({
  selector: 'app-rate-view',
  imports: [RouterLink, RateEditor],
  template: `
    <div class="gc-container gc-stack">
      <a routerLink="/collector" class="back-link">← Back to Dashboard</a>
      <header>
        <h1>💹 Milk Rates</h1>
        <p class="gc-text-muted">
          Current rates used for this shift's collections.
        </p>
      </header>
      <app-rate-editor [adminMode]="false" />
    </div>
  `,
  styles: [`
    .back-link {
      display: inline-block;
      font-size: 14px;
      font-weight: 600;
      color: var(--gc-primary);
      text-decoration: none;
      padding: var(--gc-space-xs) 0;
    }
  `]
})
export class RateView {}