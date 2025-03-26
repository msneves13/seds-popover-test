import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SedsPopoverComponent } from './seds-popover.component';
import { Component, ViewChild } from '@angular/core';
import { SedsPopoverTriggerDirective } from './seds-popover-trigger.directive';
import { SedsPopoverContentDirective } from './seds-popover-content.directive';
import { SedsPopoverCloseDirective } from './seds-popover-close.directive';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  template: `
    <seds-popover #popover>
      <button sedsPopoverTrigger>Trigger</button>
      <div *sedsPopoverContent>
        <p>Popover Content</p>
        <button sedsPopoverClose>Close</button>
      </div>
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
class TestHostComponent {
  @ViewChild('popover') popoverComponent!: SedsPopoverComponent;
  @ViewChild(SedsPopoverTriggerDirective) trigger!: SedsPopoverTriggerDirective;
  @ViewChild(SedsPopoverCloseDirective) closeButton!: SedsPopoverCloseDirective;
}

describe('SedsPopoverComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the popover component', () => {
    expect(hostComponent.popoverComponent).toBeTruthy();
  });

  it('should have initial state as closed', () => {
    expect(hostComponent.popoverComponent.stateComputed()).toBe('closed');
  });

  it('should toggle popover state when trigger is clicked', () => {
    // Initial state should be closed
    expect(hostComponent.popoverComponent.stateComputed()).toBe('closed');
    
    // Simulate click on trigger button
    const triggerElement = fixture.nativeElement.querySelector('[sedsPopoverTrigger]');
    triggerElement.click();
    fixture.detectChanges();
    
    // Popover should now be open
    expect(hostComponent.popoverComponent.stateComputed()).toBe('open');
    
    // Click again should close it
    triggerElement.click();
    fixture.detectChanges();
    
    // Popover should be closed again
    expect(hostComponent.popoverComponent.stateComputed()).toBe('closed');
  });

  it('should close popover when close button is clicked', () => {
    // First open the popover
    const triggerElement = fixture.nativeElement.querySelector('[sedsPopoverTrigger]');
    triggerElement.click();
    fixture.detectChanges();
    expect(hostComponent.popoverComponent.stateComputed()).toBe('open');
    
    // Now find and click the close button within the popover content
    const contents = document.body.querySelectorAll('button[sedsPopoverClose]');
    if (contents.length) {
      (contents[0] as HTMLElement).click();
      fixture.detectChanges();
      
      // Popover should be closed
      expect(hostComponent.popoverComponent.stateComputed()).toBe('closed');
    } else {
      // If button not found, the test will fail naturally
      fail('Close button not found in the DOM');
    }
  });

  it('should have correct alignment', () => {
    // Test default alignment
    expect(hostComponent.popoverComponent.align()).toBe('center');
  });

  it('should have correct side offset', () => {
    // Test default side offset
    expect(hostComponent.popoverComponent.sideOffset()).toBe(0);
  });
}); 