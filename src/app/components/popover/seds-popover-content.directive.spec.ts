import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SedsPopoverComponent } from './seds-popover.component';
import { SedsPopoverContentDirective } from './seds-popover-content.directive';
import { SedsPopoverTriggerDirective } from './seds-popover-trigger.directive';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  template: `
    <seds-popover #popover>
      <button sedsPopoverTrigger>Trigger</button>
      <ng-template sedsPopoverContent>
        <div class="content">Popover Content</div>
      </ng-template>
    </seds-popover>
  `,
  standalone: true,
  imports: [
    SedsPopoverComponent,
    SedsPopoverTriggerDirective,
    SedsPopoverContentDirective
  ]
})
class TestComponent {
  @ViewChild('popover') popoverComponent!: SedsPopoverComponent;
}

describe('SedsPopoverContentDirective', () => {
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

  it('should create an instance', () => {
    // Since the content is a structural directive, we need to access it through the component
    expect(component.popoverComponent).toBeTruthy();
  });

  it('should not show content initially when popover is closed', () => {
    const contentElements = document.querySelectorAll('.content');
    expect(contentElements.length).toBe(0); // Content should not be in the DOM when popover is closed
  });

  it('should show content when popover is opened', () => {
    // Open the popover
    const triggerButton = fixture.debugElement.query(By.directive(SedsPopoverTriggerDirective)).nativeElement;
    triggerButton.click();
    fixture.detectChanges();
    
    // Now check if content is visible
    const contentElement = document.querySelector('.content');
    expect(contentElement).toBeTruthy();
    expect(contentElement?.textContent).toContain('Popover Content');
  });
}); 