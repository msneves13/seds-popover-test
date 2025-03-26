import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SedsPopoverComponent } from './seds-popover.component';
import { SedsPopoverTriggerDirective } from './seds-popover-trigger.directive';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  template: `
    <seds-popover #popover>
      <button sedsPopoverTrigger>Trigger</button>
    </seds-popover>
  `,
  standalone: true,
  imports: [
    SedsPopoverComponent,
    SedsPopoverTriggerDirective
  ]
})
class TestComponent {
  @ViewChild('popover') popoverComponent!: SedsPopoverComponent;
  @ViewChild(SedsPopoverTriggerDirective) triggerDirective!: SedsPopoverTriggerDirective;
}

describe('SedsPopoverTriggerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let triggerElement: HTMLElement;

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
    
    // Get the button element with the directive
    triggerElement = fixture.debugElement.query(By.directive(SedsPopoverTriggerDirective)).nativeElement;
  });

  it('should create an instance', () => {
    expect(component.triggerDirective).toBeTruthy();
  });

  it('should toggle popover state when clicked', () => {
    // Initial state should be closed
    expect(component.popoverComponent.stateComputed()).toBe('closed');
    
    // Click the trigger button
    triggerElement.click();
    fixture.detectChanges();
    
    // Popover should be open
    expect(component.popoverComponent.stateComputed()).toBe('open');
    
    // Click again
    triggerElement.click();
    fixture.detectChanges();
    
    // Popover should be closed
    expect(component.popoverComponent.stateComputed()).toBe('closed');
  });
}); 