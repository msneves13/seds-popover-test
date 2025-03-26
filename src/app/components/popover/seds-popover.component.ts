import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
  numberAttribute,
  booleanAttribute,
  untracked,
  ViewEncapsulation,
  signal,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedsDialogComponent, SedsDialogDefaultOptions, provideSedsDialogDefaultOptions } from '../dialog';
import { OverlayRef, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

export const SEDS_POPOVER_DIALOG_DEFAULT_OPTIONS: Partial<SedsDialogDefaultOptions> = {
  hasBackdrop: false,
  scrollStrategy: 'reposition',
};

export type SedsPopoverAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'seds-popover',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content />`,
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
  styles: [`
    .cdk-overlay-pane {
      overflow: visible !important;
    }
  `]
})
export class SedsPopoverComponent extends SedsDialogComponent implements OnDestroy {
  public readonly align = input<SedsPopoverAlign>('center');
  public readonly sideOffset = input(0, { transform: numberAttribute });
  public readonly showArrow = input(true, { transform: booleanAttribute });
  public readonly arrowClass = input<string | string[]>('');
  
  private readonly _arrowClass = signal<string | string[] | null>(null);
  private overlayRef: OverlayRef | null = null;
  private positionChangeSubscription: Subscription | null = null;

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

    // Monitor state changes to update arrow visibility
    this.stateChanged.subscribe(state => {
      if (state === 'open') {
        // Clean up any existing subscription
        this.cleanupPositionSubscription();
        
        // Use a short delay to ensure the CDK has created the overlay
        setTimeout(() => {
          // Find the most recently added overlay pane
          const overlayPanes = document.querySelectorAll('.cdk-overlay-pane');
          if (overlayPanes.length > 0) {
            const mostRecentPane = overlayPanes[overlayPanes.length - 1];
            this.overlayRef = { overlayElement: mostRecentPane } as any;
            
            // Watch for position changes via mutation observer
            this.setupPositionObserver(mostRecentPane);
            
            this.updateArrowVisibility();
          }
        }, 0);
      } else if (state === 'closed') {
        this.cleanupPositionSubscription();
        this.overlayRef = null;
      }
    });
  }
  
  ngOnDestroy() {
    this.cleanupPositionSubscription();
  }
  
  /** 
   * Sets the arrow class for the popover
   * This method is used to set custom arrow classes
   */
  public setArrowClass(arrowClass: string | string[] | null | undefined) {
    this._arrowClass.set(arrowClass ?? null);
    this.updateArrowVisibility();
  }

  private setupPositionObserver(element: Element) {
    // Use MutationObserver to watch for style changes that indicate position changes
    const observer = new MutationObserver(() => {
      this.updateArrowVisibility();
    });
    
    observer.observe(element, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });
    
    // Store the observer reference in the subscription for cleanup
    this.positionChangeSubscription = {
      unsubscribe: () => observer.disconnect()
    } as Subscription;
  }
  
  private cleanupPositionSubscription() {
    if (this.positionChangeSubscription) {
      this.positionChangeSubscription.unsubscribe();
      this.positionChangeSubscription = null;
    }
  }

  private updateArrowVisibility() {
    if (!this.overlayRef) return;
    
    const overlay = this.overlayRef.overlayElement;
    const triggerEl = this.mutableAttachTo()();
    if (!triggerEl) return;
    
    // Get element's coordinates
    const overlayRect = overlay.getBoundingClientRect();
    let triggerRect: DOMRect;
    
    if (triggerEl instanceof Element) {
      triggerRect = triggerEl.getBoundingClientRect();
    } else if ('nativeElement' in triggerEl) {
      triggerRect = triggerEl.nativeElement.getBoundingClientRect();
    } else {
      triggerRect = {
        top: triggerEl.y || 0,
        bottom: (triggerEl.y || 0) + (triggerEl.height || 0),
        left: triggerEl.x || 0,
        right: (triggerEl.x || 0) + (triggerEl.width || 0),
        width: triggerEl.width || 0,
        height: triggerEl.height || 0,
        x: triggerEl.x || 0,
        y: triggerEl.y || 0,
        toJSON: () => ({})
      };
    }
    
    // Compare positions to determine if popover is above or below trigger
    const isAbove = overlayRect.bottom <= triggerRect.top;
    
    // Set position and alignment attributes for CSS selectors
    overlay.setAttribute('data-position', isAbove ? 'bottom' : 'top');
    overlay.setAttribute('data-align', this.align());
    overlay.setAttribute('data-show-arrow', this.showArrow().toString());
    
    // Apply custom arrow class if set
    if (this._arrowClass()) {
      if (Array.isArray(this._arrowClass())) {
        overlay.classList.add(...this._arrowClass() as string[]);
      } else {
        overlay.classList.add(this._arrowClass() as string);
      }
    }
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