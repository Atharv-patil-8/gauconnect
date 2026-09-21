import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DairyService } from '../../../core/services/dairy.service';
import { CollectionFlowService } from '../../../core/services/collection-flow.service';
import { ToastService } from '../../../core/services/toast.service';
import { Animal } from '../../../core/models';

@Component({
  selector: 'app-select-animal',
  imports: [],
  templateUrl: './select-animal.html',
  styleUrl: './select-animal.css'
})
export class SelectAnimal {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dairy = inject(DairyService);
  private flow = inject(CollectionFlowService);
  private toast = inject(ToastService);

  readonly farmerId = this.route.snapshot.paramMap.get('farmerId') ?? '';

  readonly farmer = computed(() => this.dairy.findFarmer(this.farmerId));

  readonly animals = computed(() => {
    const list = this.dairy.animalsForFarmer(this.farmerId);
    // Sort: Buffalo first, then Cow (common preference for milk collection)
    return [...list].sort((a, b) => a.type.localeCompare(b.type));
  });

  selectAnimal(animal: Animal): void {
    this.flow.selectAnimal(animal);
    this.toast.success(`${animal.type} #${animal.registrationNumber} selected`);
    this.router.navigate(['/collector/entry', animal.id]);
  }

  onBack(): void {
    this.flow.reset();
    this.router.navigate(['/collector/scan']);
  }

  onCancel(): void {
    this.flow.reset();
    this.router.navigate(['/collector']);
  }
}