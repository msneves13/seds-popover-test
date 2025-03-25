import { Directive } from '@angular/core';
import { SedsDialogCloseDirective } from '../dialog';

@Directive({
  selector: 'button[sedsPopoverClose]',
  standalone: true,
})
export class SedsPopoverCloseDirective extends SedsDialogCloseDirective {} 