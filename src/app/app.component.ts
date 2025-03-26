import { Component, ViewEncapsulation } from '@angular/core';
import { 
  SedsPopoverComponent, 
  SedsPopoverTriggerDirective, 
  SedsPopoverContentDirective, 
  SedsPopoverCloseDirective
} from './components/popover';
import { 
  SedsDialogComponent, 
  SedsDialogTriggerDirective, 
  SedsDialogContentDirective, 
  SedsDialogCloseDirective, 
  SedsDialogTitleDirective, 
  SedsDialogDescriptionDirective, 
  SedsDialogOverlayComponent 
} from './components/dialog';

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

      <div class="demo-section">
        <h2>Popover with Custom Arrow Color</h2>
        <div class="popover-container">
          <seds-popover [arrowClass]="'blue-arrow'">
            <button sedsPopoverTrigger class="trigger-button">
              Custom Arrow
            </button>
            <div *sedsPopoverContent class="popover-content">
              <h3>Custom Arrow Color</h3>
              <p>This popover has a blue arrow using a custom class</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>
        </div>
      </div>

      <div class="demo-section">
        <h2>Popover Arrow Styles</h2>
        <div class="popover-container">
          <seds-popover arrowClass="blue-arrow">
            <button sedsPopoverTrigger class="trigger-button">
              Blue Arrow
            </button>
            <div *sedsPopoverContent class="popover-content">
              <p>This popover has a blue arrow</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>

          <seds-popover arrowClass="large-red-arrow">
            <button sedsPopoverTrigger class="trigger-button">
              Large Red Arrow
            </button>
            <div *sedsPopoverContent class="popover-content">
              <p>This popover has a large red arrow</p>
              <button sedsPopoverClose class="close-button">Close</button>
            </div>
          </seds-popover>

          <seds-popover [arrowClass]="['green-arrow', 'thin-arrow']">
            <button sedsPopoverTrigger class="trigger-button">
              Thin Green Arrow
            </button>
            <div *sedsPopoverContent class="popover-content">
              <p>This popover has a thin green arrow</p>
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
      position: relative;
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      min-width: 200px;
      z-index: 1;
    }

    /* Popover Panel Styles */
    .seds-popover-panel {
      background-color: white !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      border-radius: 4px !important;
      padding: 8px !important;
    }

    /* Base Arrow Styles */
    .seds-popover-panel[data-show-arrow="true"]::before,
    .seds-popover-panel[data-show-arrow="true"]::after {
      content: '';
      position: absolute;
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      z-index: 10;
      pointer-events: none;
    }
    
    /* Arrow pointing up (popover below trigger) */
    .seds-popover-panel[data-show-arrow="true"]::before {
      border-bottom: 10px solid white;
      top: -10px;
      display: none;
    }
    
    /* Arrow pointing down (popover above trigger) */
    .seds-popover-panel[data-show-arrow="true"]::after {
      border-top: 10px solid white;
      bottom: -10px;
      display: none;
    }
    
    /* Arrow visibility based on position */
    .seds-popover-panel[data-show-arrow="true"][data-position="top"]::before {
      display: block !important;
    }
    
    .seds-popover-panel[data-show-arrow="true"][data-position="bottom"]::after {
      display: block !important;
    }
    
    .seds-popover-panel[data-show-arrow="true"][data-position="top"]::after {
      display: none !important;
    }
    
    .seds-popover-panel[data-show-arrow="true"][data-position="bottom"]::before {
      display: none !important;
    }
    
    /* Arrow alignment */
    .seds-popover-panel[data-show-arrow="true"][data-align="start"]::before,
    .seds-popover-panel[data-show-arrow="true"][data-align="start"]::after {
      left: 16px;
      right: auto;
      transform: none;
    }
    
    .seds-popover-panel[data-show-arrow="true"][data-align="center"]::before,
    .seds-popover-panel[data-show-arrow="true"][data-align="center"]::after {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }
    
    .seds-popover-panel[data-show-arrow="true"][data-align="end"]::before,
    .seds-popover-panel[data-show-arrow="true"][data-align="end"]::after {
      left: auto;
      right: 16px;
      transform: none;
    }

    /* Custom arrow colors */
    .seds-popover-panel[data-show-arrow="true"].blue-arrow::before {
      border-bottom-color: #2196F3 !important;
    }
    
    .seds-popover-panel[data-show-arrow="true"].blue-arrow::after {
      border-top-color: #2196F3 !important;
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

    /* Arrow Variations */
    .blue-arrow[data-show-arrow="true"]::before {
      border-bottom-color: #2196F3 !important;
    }
    
    .blue-arrow[data-show-arrow="true"]::after {
      border-top-color: #2196F3 !important;
    }

    .large-red-arrow[data-show-arrow="true"]::before,
    .large-red-arrow[data-show-arrow="true"]::after {
      border-left-width: 15px !important;
      border-right-width: 15px !important;
    }
    
    .large-red-arrow[data-show-arrow="true"]::before {
      border-bottom-width: 15px !important;
      border-bottom-color: #f44336 !important;
      top: -15px !important;
    }
    
    .large-red-arrow[data-show-arrow="true"]::after {
      border-top-width: 15px !important;
      border-top-color: #f44336 !important;
      bottom: -15px !important;
    }

    .green-arrow[data-show-arrow="true"]::before {
      border-bottom-color: #4CAF50 !important;
    }
    
    .green-arrow[data-show-arrow="true"]::after {
      border-top-color: #4CAF50 !important;
    }

    .thin-arrow[data-show-arrow="true"]::before,
    .thin-arrow[data-show-arrow="true"]::after {
      border-left-width: 6px !important;
      border-right-width: 6px !important;
    }
    
    .thin-arrow[data-show-arrow="true"]::before {
      border-bottom-width: 6px !important;
      top: -6px !important;
    }
    
    .thin-arrow[data-show-arrow="true"]::after {
      border-top-width: 6px !important;
      bottom: -6px !important;
    }
  `
})
export class AppComponent {
  title = 'seds-popover-test';
}
