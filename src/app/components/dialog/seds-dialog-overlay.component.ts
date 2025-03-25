import { ChangeDetectionStrategy, Component, effect, inject, input, untracked, ViewEncapsulation } from '@angular/core';
import { provideCustomClassSettableExisting } from '../core/custom-element-class-settable';
import { SedsDialogComponent } from './seds-dialog.component';

@Component({
	selector: 'seds-dialog-overlay',
	standalone: true,
	template: '',
	providers: [provideCustomClassSettableExisting(() => SedsDialogOverlayComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SedsDialogOverlayComponent {
	private readonly _sedsDialog = inject(SedsDialogComponent);

	public readonly className = input<string | null | undefined>(undefined, { alias: 'class' });

	setClassToCustomElement(newClass: string) {
		this._sedsDialog.setOverlayClass(newClass);
	}
	constructor() {
		effect(() => {
			if (!this._sedsDialog) return;
			const newClass = this.className();
			untracked(() => this._sedsDialog.setOverlayClass(newClass));
		});
	}
}
