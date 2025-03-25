import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, inject, input } from '@angular/core';
import { SedsDialogRef } from './seds-dialog-ref';

@Directive({
	selector: 'button[sedsDialogClose]',
	standalone: true,
	host: {
		'(click)': 'close()',
	},
})
export class SedsDialogCloseDirective {
	private readonly _sedsDialogRef = inject(SedsDialogRef);

	public readonly delay = input<number | undefined, number>(undefined, { transform: coerceNumberProperty });

	public close() {
		this._sedsDialogRef.close(undefined, this.delay());
	}
}
