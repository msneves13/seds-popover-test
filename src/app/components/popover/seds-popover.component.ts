import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  numberAttribute,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { SedsDialogComponent, SedsDialogDefaultOptions, provideSedsDialogDefaultOptions } from '../dialog';

export const SEDS_POPOVER_DIALOG_DEFAULT_OPTIONS: Partial<SedsDialogDefaultOptions> = {
  hasBackdrop: false,
  scrollStrategy: 'reposition',
};

export type SedsPopoverAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'seds-popover',
  standalone: true,
  template: `
    <ng-content />
  `,
  providers: [
    {
      provide: SedsDialogComponent,
      useExisting: forwardRef(() => SedsPopoverComponent),
    },
    provideSedsDialogDefaultOptions(SEDS_POPOVER_DIALOG_DEFAULT_OPTIONS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'sedsPopover',
})
export class SedsPopoverComponent extends SedsDialogComponent {
  public readonly align = input<SedsPopoverAlign>('center');
  public readonly sideOffset = input(0, { transform: numberAttribute });

  constructor() {
    super();
    this.setAriaDescribedBy('');
    this.setAriaLabelledBy('');

    effect(() => {
      const align = this.align();
      untracked(() => {
        this.mutableAttachPositions().set([
          {
            originX: align,
            originY: 'bottom',
            overlayX: align,
            overlayY: 'top',
          },
          {
            originX: align,
            originY: 'top',
            overlayX: align,
            overlayY: 'bottom',
          },
        ]);
      });
      untracked(() => {
        this.applySideOffset(this.sideOffset());
      });
    });
    effect(() => {
      const sideOffset = this.sideOffset();
      untracked(() => {
        this.applySideOffset(sideOffset);
      });
    });
  }

  private applySideOffset(sideOffset: number) {
    this.mutableAttachPositions().update((positions) =>
      positions.map((position) => ({
        ...position,
        offsetY: position.originY === 'top' ? -sideOffset : sideOffset,
      })),
    );
  }
} 