import { Component, ViewEncapsulation } from '@angular/core';
import { SedsPopoverComponent, SedsPopoverTriggerDirective, SedsPopoverContentDirective, SedsPopoverCloseDirective } from './components/popover';
import { SedsDialogComponent, SedsDialogTriggerDirective, SedsDialogContentDirective, SedsDialogCloseDirective, SedsDialogTitleDirective, SedsDialogDescriptionDirective, SedsDialogOverlayComponent } from './components/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
	encapsulation: ViewEncapsulation.None,
  imports: [
    SedsPopoverComponent,
    SedsPopoverTriggerDirective,
    SedsPopoverContentDirective,
    SedsPopoverCloseDirective,
    SedsDialogComponent,
    SedsDialogTriggerDirective,
    SedsDialogContentDirective,
    SedsDialogCloseDirective,
    SedsDialogTitleDirective,
    SedsDialogDescriptionDirective,
    SedsDialogOverlayComponent
  ],
  template: `
    <div class="container">
      <h1>SEDS Components Example</h1>
      
      <div class="demo-section">
        <h2>Basic Popover</h2>
        <div class="popover-container">
          <seds-popover>
            <button sedsPopoverTrigger class="trigger-button">
              Open Popover
            </button>
            <div *sedsPopoverContent class="popover-content">
              <h3>Popover Title</h3>
              <p>This is a simple popover content with a button to close it.</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>
        </div>
      </div>

      <div class="demo-section">
        <h2>Popover with Different Alignment</h2>
        <div class="popover-container">
          <seds-popover align="start">
            <button sedsPopoverTrigger class="trigger-button">
              Left Aligned
            </button>
            <div *sedsPopoverContent class="popover-content">
              <h3>Left Aligned</h3>
              <p>This popover is aligned to the left (start)</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>

          <seds-popover align="end">
            <button sedsPopoverTrigger class="trigger-button">
              Right Aligned
            </button>
            <div *sedsPopoverContent class="popover-content">
              <h3>Right Aligned</h3>
              <p>This popover is aligned to the right (end)</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>
        </div>
      </div>

      <div class="demo-section">
        <h2>Popover with Side Offset</h2>
        <div class="popover-container">
          <seds-popover [sideOffset]="10">
            <button sedsPopoverTrigger class="trigger-button">
              With Offset
            </button>
            <div *sedsPopoverContent class="popover-content">
              <h3>With Offset</h3>
              <p>This popover has a 10px offset from the trigger</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>
        </div>
      </div>
      
      <!-- Dialog Examples -->
      <div class="demo-section">
        <h2>Basic Dialog</h2>
        <div class="dialog-container">
          <seds-dialog>
            <seds-dialog-overlay class="dark-overlay"></seds-dialog-overlay>
            <button sedsDialogTrigger class="trigger-button">
              Open Basic Dialog
            </button>
            <div *sedsDialogContent class="dialog-content">
              <h3 sedsDialogTitle>Dialog Title</h3>
              <p sedsDialogDescription>This is a simple dialog with a title, description, and close button.</p>
              <div class="dialog-actions">
                <button sedsDialogClose class="close-button">Close</button>
              </div>
            </div>
          </seds-dialog>
        </div>
      </div>

      <div class="demo-section">
        <h2>Confirmation Dialog</h2>
        <div class="dialog-container">
          <seds-dialog>
            <seds-dialog-overlay class="dark-overlay"></seds-dialog-overlay>
            <button sedsDialogTrigger class="trigger-button">
              Open Confirmation Dialog
            </button>
            <div *sedsDialogContent class="dialog-content">
              <h3 sedsDialogTitle>Confirm Action</h3>
              <p sedsDialogDescription>Are you sure you want to proceed with this action?</p>
              <div class="dialog-actions">
                <button sedsDialogClose class="action-button confirm">Confirm</button>
                <button sedsDialogClose class="action-button cancel">Cancel</button>
              </div>
            </div>
          </seds-dialog>
        </div>
      </div>

      <div class="demo-section">
        <h2>Form Dialog</h2>
        <div class="dialog-container">
          <seds-dialog>
            <seds-dialog-overlay class="dark-overlay"></seds-dialog-overlay>
            <button sedsDialogTrigger class="trigger-button">
              Open Form Dialog
            </button>
            <div *sedsDialogContent class="dialog-content">
              <h3 sedsDialogTitle>User Information</h3>
              <p sedsDialogDescription>Please fill in your information below.</p>
              <form class="dialog-form">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" placeholder="Your name">
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" placeholder="Your email">
                </div>
                <div class="dialog-actions">
                  <button type="submit" class="action-button confirm">Submit</button>
                  <button type="button" sedsDialogClose class="action-button cancel">Cancel</button>
                </div>
              </form>
            </div>
          </seds-dialog>
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    .demo-section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .popover-container,
    .dialog-container {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }

    .trigger-button {
      padding: 8px 16px;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .popover-content {
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      min-width: 200px;
    }

    .dialog-content {
      padding: 20px;
      background-color: white;
      color: #333;
      border-radius: 6px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      min-width: 300px;
      max-width: 500px;
    }

    .close-button {
      padding: 6px 12px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .action-button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .confirm {
      background-color: #4caf50;
      color: white;
    }

    .cancel {
      background-color: #f44336;
      color: white;
    }

    .dialog-form {
      margin-top: 15px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      background-color: white;
      color: #333;
      border-radius: 4px;
    }

    .dark-overlay {
      background-color: rgba(0, 0, 0, 0.4) !important;
    }
  `
})
export class AppComponent {
  title = 'seds-popover-test';
}
