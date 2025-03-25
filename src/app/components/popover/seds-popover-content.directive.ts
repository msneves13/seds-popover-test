import { Directive } from '@angular/core';
import { provideExposesStateProviderExisting } from '../core';
import { SedsDialogContentDirective } from '../dialog';

@Directive({
  selector: '[sedsPopoverContent]',
  standalone: true,
  providers: [provideExposesStateProviderExisting(() => SedsPopoverContentDirective)],
})
export class SedsPopoverContentDirective<T> extends SedsDialogContentDirective<T> {} 