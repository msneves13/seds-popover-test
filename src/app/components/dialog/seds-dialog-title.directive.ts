import { Directive, effect, inject, signal } from '@angular/core';
import { SedsDialogRef } from './seds-dialog-ref';

@Directive({
	selector: '[sedsDialogTitle]',
	standalone: true,
	host: {
		'[id]': '_id()',
	},
})
export class SedsDialogTitleDirective {
	private readonly _sedsDialogRef = inject(SedsDialogRef);

	protected _id = signal(`seds-dialog-title-${this._sedsDialogRef?.dialogId}`);

	constructor() {
		effect(() => {
			this._sedsDialogRef.setAriaLabelledBy(this._id());
		});
	}
}
