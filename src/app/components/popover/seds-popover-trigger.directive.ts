import { Directive, ElementRef, effect, inject, input, untracked } from '@angular/core';
import { SedsDialogTriggerDirective } from '../dialog';
import type { SedsPopoverComponent } from './seds-popover.component';

@Directive({
	selector: 'button[sedsPopoverTrigger],button[sedsPopoverTriggerFor]',
	standalone: true,
	host: {
		'[id]': 'id()',
		'aria-haspopup': 'dialog',
		'[attr.aria-expanded]': "state() === 'open' ? 'true': 'false'",
		'[attr.data-state]': 'state()',
		'[attr.aria-controls]': 'dialogId',
	},
})
export class SedsPopoverTriggerDirective extends SedsDialogTriggerDirective {
	private readonly _host = inject(ElementRef, { host: true });

	public readonly sedsPopoverTriggerFor = input<SedsPopoverComponent | undefined>(undefined, {
		alias: 'sedsPopoverTriggerFor',
	});

	constructor() {
		super();
		if (!this._sedsDialog) return;
		this._sedsDialog.mutableAttachTo().set(this._host.nativeElement);
		this._sedsDialog.mutableCloseOnOutsidePointerEvents().set(true);

		effect(() => {
			const sedsDialog = this.sedsPopoverTriggerFor();
			untracked(() => {
				if (!sedsDialog) return;
				sedsDialog.mutableAttachTo().set(this._host.nativeElement);
				sedsDialog.mutableCloseOnOutsidePointerEvents().set(true);
				this.mutableSedsDialogTriggerFor().set(sedsDialog);
			});
		});
	}
}
