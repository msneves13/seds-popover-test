import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SedsDialogComponent } from './seds-dialog.component';
import { SedsDialogTriggerDirective } from './seds-dialog-trigger.directive';
import { SedsDialogContentDirective } from './seds-dialog-content.directive';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  template: `
    <seds-dialog #dialog>
      <button sedsDialogTrigger>Open Dialog</button>
      <div *sedsDialogContent class="dialog-content">Dialog Content</div>
    </seds-dialog>
  `,
  standalone: true,
  imports: [
    SedsDialogComponent,
    SedsDialogTriggerDirective,
    SedsDialogContentDirective
  ]
})
class TestComponent {
  @ViewChild('dialog') dialogComponent!: SedsDialogComponent;
}

describe('SedsDialogContentDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a dialog with content template', () => {
    expect(component.dialogComponent).toBeTruthy();
  });

  it('should not show content initially when dialog is closed', () => {
    // When dialog is closed, content should not be in the DOM
    const contentElements = document.querySelectorAll('.dialog-content');
    expect(contentElements.length).toBe(0);
  });

  it('should show content when dialog is opened', () => {
    // Open the dialog
    const triggerButton = fixture.debugElement.query(By.directive(SedsDialogTriggerDirective)).nativeElement;
    triggerButton.click();
    fixture.detectChanges();
    
    // Now content should be visible in the DOM
    const contentElement = document.querySelector('.dialog-content');
    expect(contentElement).toBeTruthy();
    expect(contentElement?.textContent).toContain('Dialog Content');
  });
}); 