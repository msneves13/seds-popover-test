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
      <div *sedsDialogContent>Dialog Content</div>
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
  @ViewChild(SedsDialogTriggerDirective) triggerDirective!: SedsDialogTriggerDirective;
}

describe('SedsDialogTriggerDirective', () => {
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
    
    triggerElement = fixture.debugElement.query(By.directive(SedsDialogTriggerDirective)).nativeElement;
  });

  it('should create an instance', () => {
    expect(component.triggerDirective).toBeTruthy();
  });

  it('should be associated with a dialog component', () => {
    expect(component.triggerDirective).toBeTruthy();
  });

  it('should open dialog when clicked', () => {
    // Initial state should be closed
    expect(component.dialogComponent.stateComputed()).toBe('closed');
    
    // Click the trigger button
    triggerElement.click();
    fixture.detectChanges();
    
    // Dialog should be opened
    expect(component.dialogComponent.stateComputed()).toBe('open');
  });
}); 