import { Component } from '@angular/core';
import { SedsPopoverComponent, SedsPopoverTriggerDirective, SedsPopoverContentDirective, SedsPopoverCloseDirective } from './components/popover';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SedsPopoverComponent,
    SedsPopoverTriggerDirective,
    SedsPopoverContentDirective,
    SedsPopoverCloseDirective
  ],
  template: `
    <div class="container">
      <h1>SEDS Popover Example</h1>
      
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

    .popover-container {
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

    .close-button {
      padding: 6px 12px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  `
})
export class AppComponent {
  title = 'seds-popover-test';
}
