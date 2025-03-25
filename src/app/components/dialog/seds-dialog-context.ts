import { Injectable, InjectionToken, inject, type Type } from '@angular/core';

export interface SedsDialogContext<T = unknown> {
  $implicit: T;
  $component: Type<unknown>;
  $dynamicComponentClass: string;
}

export const SEDS_DIALOG_DATA = new InjectionToken<unknown>('SEDS_DIALOG_DATA');
export const SEDS_DIALOG_CONTEXT = new InjectionToken<SedsDialogContext>('SEDS_DIALOG_CONTEXT');

@Injectable({
  providedIn: 'root',
})
export class SedsDialogContextService<T = unknown> {
  public get context(): SedsDialogContext<T> | null {
    return this._context;
  }

  public set context(context: SedsDialogContext<T> | null) {
    this._context = context;
  }

  private _context: SedsDialogContext<T> | null = null;
}

export function injectSedsDialogContext<T = unknown>(options?: { optional?: boolean }) {
  if (options?.optional) {
    const service = inject(SedsDialogContextService<T>, { optional: true });
    const token = inject(SEDS_DIALOG_CONTEXT, { optional: true });
    return token ?? service?.context;
  }
  return inject(SEDS_DIALOG_CONTEXT);
}

export function injectSedsDialogData<T = unknown>() {
  return inject(SEDS_DIALOG_DATA);
} 