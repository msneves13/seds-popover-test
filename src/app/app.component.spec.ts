import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { SedsPopoverComponent, SedsPopoverTriggerDirective, SedsPopoverContentDirective, SedsPopoverCloseDirective } from './components/popover';
import { SedsDialogComponent, SedsDialogTriggerDirective, SedsDialogContentDirective, SedsDialogCloseDirective, SedsDialogTitleDirective, SedsDialogDescriptionDirective, SedsDialogOverlayComponent } from './components/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
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
      providers: [
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('seds-popover-test');
  });

  it('should render main heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('SEDS Components Example');
  });

  it('should render popover sections', () => {
    const sections = fixture.debugElement.queryAll(By.css('.demo-section h2'));
    const sectionTitles = sections.map(section => section.nativeElement.textContent.trim());
    
    expect(sectionTitles).toContain('Basic Popover');
    expect(sectionTitles).toContain('Popover with Different Alignment');
    expect(sectionTitles).toContain('Popover with Side Offset');
  });

  it('should render dialog sections', () => {
    const sections = fixture.debugElement.queryAll(By.css('.demo-section h2'));
    const sectionTitles = sections.map(section => section.nativeElement.textContent.trim());
    
    expect(sectionTitles).toContain('Basic Dialog');
    expect(sectionTitles).toContain('Confirmation Dialog');
    expect(sectionTitles).toContain('Form Dialog');
  });

  it('should have popover trigger buttons', () => {
    const popoverTriggers = fixture.debugElement.queryAll(By.directive(SedsPopoverTriggerDirective));
    expect(popoverTriggers.length).toBeGreaterThanOrEqual(3);
  });

  it('should have dialog trigger buttons', () => {
    const dialogTriggers = fixture.debugElement.queryAll(By.directive(SedsDialogTriggerDirective));
    expect(dialogTriggers.length).toBeGreaterThanOrEqual(3);
  });

  it('should have dialog overlay components with dark-overlay class', () => {
    const dialogOverlays = fixture.debugElement.queryAll(By.directive(SedsDialogOverlayComponent));
    dialogOverlays.forEach(overlay => {
      expect(overlay.nativeElement.classList.contains('dark-overlay')).toBeTrue();
    });
  });
});
