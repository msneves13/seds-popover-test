import { computed, Directive, effect, inject, input, TemplateRef, untracked } from '@angular/core';
import { provideExposesStateProviderExisting } from '../core';
import { SedsDialogRef } from './seds-dialog-ref';
import { SedsDialogComponent } from './seds-dialog.component';

@Directive({
	selector: '[sedsDialogContent]',
	standalone: true,
	providers: [provideExposesStateProviderExisting(() => SedsDialogContentDirective)],
})
export class SedsDialogContentDirective<T> {
	private readonly _sedsDialog = inject(SedsDialogComponent, { optional: true });
	private readonly _sedsDialogRef = inject(SedsDialogRef, { optional: true });
	private readonly _template = inject(TemplateRef);
	public readonly state = computed(() => this._sedsDialog?.stateComputed() ?? this._sedsDialogRef?.state() ?? 'closed');

	public readonly className = input<string | null | undefined>(undefined, { alias: 'class' });

	public readonly context = input<T | undefined>(undefined);

	constructor() {
		if (!this._sedsDialog) return;
		this._sedsDialog.registerTemplate(this._template);
		effect(() => {
			const context = this.context();
			if (!this._sedsDialog || !context) return;
			untracked(() => this._sedsDialog?.setContext(context));
		});
		effect(() => {
			if (!this._sedsDialog) return;
			const newClass = this.className();
			untracked(() => this._sedsDialog?.setPanelClass(newClass));
		});
	}
}
