import { Directive, ElementRef, inject } from '@angular/core';
import { provideExposesStateProviderExisting } from '../core';
import { SedsDialogContentDirective } from '../dialog';
import { SedsPopoverComponent } from './seds-popover.component';

@Directive({
  selector: '[sedsPopoverContent]',
  standalone: true,
  providers: [provideExposesStateProviderExisting(() => SedsPopoverContentDirective)],
})
export class SedsPopoverContentDirective<T> extends SedsDialogContentDirective<T> {
  private readonly popoverComponent = inject(SedsPopoverComponent, { optional: true });
  
  constructor() {
    super();
    
    // Apply panel class to ensure proper styling
    if (this.popoverComponent) {
      setTimeout(() => {
        this.popoverComponent?.setPanelClass('seds-popover-panel');
      }, 0);
    }
  }
} 