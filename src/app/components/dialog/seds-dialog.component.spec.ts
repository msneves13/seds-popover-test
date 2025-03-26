import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SedsDialogComponent } from './seds-dialog.component';
import { SedsDialogTriggerDirective } from './seds-dialog-trigger.directive';
import { SedsDialogContentDirective } from './seds-dialog-content.directive';
import { SedsDialogCloseDirective } from './seds-dialog-close.directive';
import { SedsDialogTitleDirective } from './seds-dialog-title.directive';
import { SedsDialogDescriptionDirective } from './seds-dialog-description.directive';
import { SedsDialogOverlayComponent } from './seds-dialog-overlay.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  template: `
    <seds-dialog #dialog>
      <seds-dialog-overlay class="test-overlay"></seds-dialog-overlay>
      <button sedsDialogTrigger>Open Dialog</button>
      <div *sedsDialogContent class="dialog-content">
        <h3 sedsDialogTitle>Test Dialog</h3>
        <p sedsDialogDescription>This is a test dialog</p>
        <button sedsDialogClose>Close</button>
      </div>
    </seds-dialog>
  `,
  standalone: true,
  imports: [
    SedsDialogComponent,
    SedsDialogTriggerDirective,
    SedsDialogContentDirective,
    SedsDialogCloseDirective,
    SedsDialogTitleDirective,
    SedsDialogDescriptionDirective,
    SedsDialogOverlayComponent
  ]
})
class TestComponent {
  @ViewChild('dialog') dialogComponent!: SedsDialogComponent;
  @ViewChild(SedsDialogTriggerDirective) triggerDirective!: SedsDialogTriggerDirective;
}

describe('SedsDialogComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideNoopAnimations() // Provide NoopAnimations to avoid animation errors
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog component', () => {
    expect(component.dialogComponent).toBeTruthy();
  });

  it('should have initial state as closed', () => {
    expect(component.dialogComponent.stateComputed()).toBe('closed');
  });

  it('should open dialog when trigger is clicked', () => {
    // Initial state should be closed
    expect(component.dialogComponent.stateComputed()).toBe('closed');
    
    // Click the trigger button
    const triggerButton = fixture.debugElement.query(By.directive(SedsDialogTriggerDirective)).nativeElement;
    triggerButton.click();
    fixture.detectChanges();
    
    // Dialog should be opened
    expect(component.dialogComponent.stateComputed()).toBe('open');
  });

  it('should close dialog when close button is clicked', async () => {
    // First open the dialog
    const triggerButton = fixture.debugElement.query(By.directive(SedsDialogTriggerDirective)).nativeElement;
    triggerButton.click();
    fixture.detectChanges();
    
    // Verify it's open
    expect(component.dialogComponent.stateComputed()).toBe('open');
    
    // Now find and click the close button in the dialog content
    const dialogContent = document.querySelector('.dialog-content') as HTMLElement;
    expect(dialogContent).toBeTruthy();
    
    const closeButton = dialogContent.querySelector('[sedsDialogClose]') as HTMLElement;
    expect(closeButton).toBeTruthy();
    
    closeButton.click();
    fixture.detectChanges();
    
    // The dialog might close after a short delay, so we need to wait
    await new Promise(resolve => setTimeout(resolve, 150)); // Wait for close delay
    fixture.detectChanges();
    
    // Verify it's closed
    expect(component.dialogComponent.stateComputed()).toBe('closed');
  });

  it('should apply overlay class', () => {
    // Initial state should have no overlay visible
    expect(document.querySelector('.test-overlay')).toBeFalsy();
    
    // Open the dialog
    const triggerButton = fixture.debugElement.query(By.directive(SedsDialogTriggerDirective)).nativeElement;
    triggerButton.click();
    fixture.detectChanges();
    
    // After opening the dialog, CDK should create overlay with our class
    const overlay = document.querySelector('.cdk-overlay-backdrop');
    expect(overlay).toBeTruthy();
  });
}); 