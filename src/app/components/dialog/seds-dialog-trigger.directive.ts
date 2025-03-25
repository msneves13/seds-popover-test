import { computed, Directive, effect, inject, input, type Signal, signal } from '@angular/core';
import { SedsDialogRef } from './seds-dialog-ref';
import type { SedsDialogState } from './seds-dialog-state';
import { SedsDialogComponent } from './seds-dialog.component';

let idSequence = 0;

@Directive({
	selector: 'button[sedsDialogTrigger],button[sedsDialogTriggerFor]',
	standalone: true,
	host: {
		'[id]': 'id()',
		'(click)': 'open()',
		'aria-haspopup': 'dialog',
		'[attr.aria-expanded]': "state() === 'open' ? 'true': 'false'",
		'[attr.data-state]': 'state()',
		'[attr.aria-controls]': 'dialogId',
	},
	exportAs: 'sedsDialogTrigger',
})
export class SedsDialogTriggerDirective {
	protected _sedsDialog = inject(SedsDialogComponent, { optional: true });
	protected readonly _sedsDialogRef = inject(SedsDialogRef, { optional: true });

	public readonly id = input(`seds-dialog-trigger-${idSequence++}`);

	public readonly state: Signal<SedsDialogState> = this._sedsDialogRef?.state ?? signal('closed');
	public readonly dialogId = `seds-dialog-${this._sedsDialogRef?.dialogId ?? idSequence++}`;

	public readonly sedsDialogTriggerFor = input<SedsDialogComponent | undefined>(undefined, {
		alias: 'sedsDialogTriggerFor',
	});
	public readonly mutableSedsDialogTriggerFor = computed(() => signal(this.sedsDialogTriggerFor()));
	public readonly sedsDialogTriggerForState = computed(() => this.mutableSedsDialogTriggerFor()());

	constructor() {
		effect(() => {
			const sedsDialog = this.sedsDialogTriggerForState();
			if (!sedsDialog) return;
			this._sedsDialog = sedsDialog;
		});
	}

	open() {
		this._sedsDialog?.open();
	}
}
