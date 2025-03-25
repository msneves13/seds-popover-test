import { NgModule } from '@angular/core';

import { SedsDialogCloseDirective } from './seds-dialog-close.directive';
import { SedsDialogContentDirective } from './seds-dialog-content.directive';
import { SedsDialogDescriptionDirective } from './seds-dialog-description.directive';
import { SedsDialogOverlayComponent } from './seds-dialog-overlay.component';
import { SedsDialogTitleDirective } from './seds-dialog-title.directive';
import { SedsDialogTriggerDirective } from './seds-dialog-trigger.directive';
import { SedsDialogComponent } from './seds-dialog.component';

export * from './seds-dialog-close.directive';
export * from './seds-dialog-content.directive';
export * from './seds-dialog-description.directive';
export * from './seds-dialog-options';
export * from './seds-dialog-overlay.component';
export * from './seds-dialog-ref';
export * from './seds-dialog-state';
export * from './seds-dialog-title.directive';
export * from './seds-dialog-token';
export * from './seds-dialog-trigger.directive';
export * from './seds-dialog-utils';
export * from './seds-dialog.component';
export * from './seds-dialog.service';

export const SedsDialogImports = [
	SedsDialogComponent,
	SedsDialogOverlayComponent,
	SedsDialogTriggerDirective,
	SedsDialogCloseDirective,
	SedsDialogContentDirective,
	SedsDialogTitleDirective,
	SedsDialogDescriptionDirective,
] as const;

@NgModule({
	imports: [...SedsDialogImports],
	exports: [...SedsDialogImports],
})
export class SedsDialogModule {}
