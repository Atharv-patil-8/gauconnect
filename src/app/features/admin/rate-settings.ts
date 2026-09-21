import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RateEditor } from '../../shared/components/rate-editor/rate-editor';

@Component({
  selector: 'app-rate-settings',
  standalone: true,
  imports: [RouterLink, RateEditor],
  template: `
    <div class="gc-container gc-stack">
      <a routerLink="/admin" class="back-link">← Back to Admin</a>
      <header>
        <h1>💹 Milk Rate Settings</h1>
        <p class="gc-text-muted">
          These rates are used to calculate milk payments for all collectors.
        </p>
      </header>
      <app-rate-editor [adminMode]="true" />
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
export class RateSettings {}