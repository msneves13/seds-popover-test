import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { type ComponentType, OverlayPositionBuilder, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
	type EffectRef,
	type InjectOptions,
	Injectable,
	Injector,
	RendererFactory2,
	type StaticProvider,
	type TemplateRef,
	type ViewContainerRef,
	computed,
	effect,
	inject,
	runInInjectionContext,
	signal,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import type { SedsDialogOptions } from './seds-dialog-options';
import { SedsDialogRef } from './seds-dialog-ref';
import type { SedsDialogState } from './seds-dialog-state';
import { cssClassesToArray } from './seds-dialog-utils';

let dialogSequence = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SedsDialogContext<T> = T & { close: (result?: any) => void };

/** @deprecated `injectSedsDialogCtx` will no longer be supported once components are stable. Use `injectSedsDialogContext` instead.  */
export const injectSedsDialogCtx = <T>(): SedsDialogContext<T> => {
	return inject(DIALOG_DATA);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const injectSedsDialogContext = <DialogContext = any>(options: InjectOptions = {}) => {
	return inject(DIALOG_DATA, options) as DialogContext;
};

@Injectable({ providedIn: 'root' })
export class SedsDialogService {
	private readonly _cdkDialog = inject(Dialog);
	private readonly _rendererFactory = inject(RendererFactory2);
	private readonly _renderer = this._rendererFactory.createRenderer(null, null);
	private readonly _positionBuilder = inject(OverlayPositionBuilder);
	private readonly _sso = inject(ScrollStrategyOptions);
	private readonly _injector = inject(Injector);

	public open<DialogContext>(
		content: ComponentType<unknown> | TemplateRef<unknown>,
		vcr?: ViewContainerRef,
		context?: DialogContext,
		options?: Partial<SedsDialogOptions>,
	) {
		if (options?.id && this._cdkDialog.getDialogById(options.id)) {
			throw new Error(`Dialog with ID: ${options.id} already exists`);
		}

		const positionStrategy =
			options?.positionStrategy ??
			(options?.attachTo && options?.attachPositions && options?.attachPositions?.length > 0
				? this._positionBuilder?.flexibleConnectedTo(options.attachTo).withPositions(options.attachPositions ?? [])
				: this._positionBuilder.global().centerHorizontally().centerVertically());

		let sedsDialogRef!: SedsDialogRef;
		let effectRef!: EffectRef;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const contextOrData: SedsDialogContext<any> = {
			...context,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			close: (result: any = undefined) => sedsDialogRef.close(result, options?.closeDelay),
		};

		const destroyed$ = new Subject<void>();
		const open = signal<boolean>(true);
		const state = computed<SedsDialogState>(() => (open() ? 'open' : 'closed'));
		const dialogId = dialogSequence++;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const cdkDialogRef = this._cdkDialog.open(content, {
			id: options?.id ?? `seds-dialog-${dialogId}`,
			role: options?.role,
			viewContainerRef: vcr,
			templateContext: () => ({
				$implicit: contextOrData,
			}),
			data: contextOrData,
			hasBackdrop: options?.hasBackdrop,
			panelClass: cssClassesToArray(options?.panelClass),
			backdropClass: cssClassesToArray(options?.backdropClass, 'bg-transparent'),
			positionStrategy,
			scrollStrategy: options?.scrollStrategy ?? this._sso?.block(),
			restoreFocus: options?.restoreFocus,
			disableClose: true,
			autoFocus: options?.autoFocus ?? 'first-tabbable',
			ariaDescribedBy: options?.ariaDescribedBy ?? `seds-dialog-description-${dialogId}`,
			ariaLabelledBy: options?.ariaLabelledBy ?? `seds-dialog-title-${dialogId}`,
			ariaLabel: options?.ariaLabel,
			ariaModal: options?.ariaModal,
			providers: (cdkDialogRef) => {
				sedsDialogRef = new SedsDialogRef(cdkDialogRef, open, state, dialogId, options as SedsDialogOptions);

				runInInjectionContext(this._injector, () => {
					effectRef = effect(() => {
						if (overlay) {
							this._renderer.setAttribute(overlay, 'data-state', state());
						}
						if (backdrop) {
							this._renderer.setAttribute(backdrop, 'data-state', state());
						}
					});
				});

				const providers: StaticProvider[] = [
					{
						provide: SedsDialogRef,
						useValue: sedsDialogRef,
					},
				];

				if (options?.providers) {
					if (typeof options.providers === 'function') {
						providers.push(...options.providers());
					}

					if (Array.isArray(options.providers)) {
						providers.push(...options.providers);
					}
				}

				return providers;
			},
		});

		const overlay = cdkDialogRef.overlayRef.overlayElement;
		const backdrop = cdkDialogRef.overlayRef.backdropElement;

		if (options?.closeOnOutsidePointerEvents) {
			cdkDialogRef.outsidePointerEvents.pipe(takeUntil(destroyed$)).subscribe(() => {
				sedsDialogRef.close(undefined, options?.closeDelay);
			});
		}

		if (options?.closeOnBackdropClick) {
			cdkDialogRef.backdropClick.pipe(takeUntil(destroyed$)).subscribe(() => {
				sedsDialogRef.close(undefined, options?.closeDelay);
			});
		}

		if (!options?.disableClose) {
			cdkDialogRef.keydownEvents
				.pipe(
					filter((e) => e.key === 'Escape'),
					takeUntil(destroyed$),
				)
				.subscribe(() => {
					sedsDialogRef.close(undefined, options?.closeDelay);
				});
		}

		cdkDialogRef.closed.pipe(takeUntil(destroyed$)).subscribe(() => {
			effectRef?.destroy();
			destroyed$.next();
		});

		return sedsDialogRef;
	}
}
