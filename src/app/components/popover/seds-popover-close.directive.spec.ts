import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SedsPopoverComponent } from './seds-popover.component';
import { SedsPopoverCloseDirective } from './seds-popover-close.directive';
import { SedsPopoverContentDirective } from './seds-popover-content.directive';
import { SedsPopoverTriggerDirective } from './seds-popover-trigger.directive';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  template: `
    <seds-popover #popover>
      <button sedsPopoverTrigger>Trigger</button>
      <ng-template sedsPopoverContent>
        <p>Popover Content</p>
        <button sedsPopoverClose>Close</button>
      </ng-template>
    </seds-popover>
  `,
  standalone: true,
  imports: [
    SedsPopoverComponent,
    SedsPopoverTriggerDirective,
    SedsPopoverContentDirective,
    SedsPopoverCloseDirective
  ]
})
class TestComponent {
  @ViewChild('popover') popoverComponent!: SedsPopoverComponent;
}

describe('SedsPopoverCloseDirective', () => {
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

  it('should create a popover with close button', () => {
    expect(component.popoverComponent).toBeTruthy();
  });

  it('should close popover when close button is clicked', () => {
    // First open the popover
    const triggerButton = fixture.debugElement.query(By.directive(SedsPopoverTriggerDirective)).nativeElement;
    triggerButton.click();
    fixture.detectChanges();
    
    // Verify it's open
    expect(component.popoverComponent.stateComputed()).toBe('open');
    
    // Now find and click the close button
    const closeButtons = document.querySelectorAll('[sedsPopoverClose]');
    expect(closeButtons.length).toBeGreaterThan(0);
    (closeButtons[0] as HTMLElement).click();
    fixture.detectChanges();
    
    // Verify it's closed
    expect(component.popoverComponent.stateComputed()).toBe('closed');
  });
}); 