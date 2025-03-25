import { Directive, effect, inject, signal } from '@angular/core';
import { SedsDialogRef } from './seds-dialog-ref';

@Directive({
	selector: '[sedsDialogDescription]',
	standalone: true,
	host: {
		'[id]': '_id()',
	},
})
export class SedsDialogDescriptionDirective {
	private readonly _sedsDialogRef = inject(SedsDialogRef);

	protected _id = signal(`seds-dialog-description-${this._sedsDialogRef?.dialogId}`);

	constructor() {
		effect(() => {
			this._sedsDialogRef.setAriaDescribedBy(this._id());
		});
	}
}
