import { Component, ElementRef, OnInit } from '@angular/core';
import { AccessibilityService } from '../../services/accessibility.service';

interface AccessibilityTest {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

@Component({
  selector: 'app-accessibility-checker',
  template: `
    <div class="accessibility-checker" *ngIf="showChecker">
      <h3>Accessibility Test Results</h3>
      <div class="test-results">
        <div *ngFor="let test of tests" 
             [class]="'test-item ' + test.status"
             [attr.aria-label]="test.name + ': ' + test.status">
          <span class="test-icon" aria-hidden="true">
            {{ test.status === 'pass' ? '✓' : test.status === 'fail' ? '✗' : '⚠' }}
          </span>
          <span class="test-name">{{ test.name }}</span>
          <p class="test-message">{{ test.message }}</p>
        </div>
      </div>
      <button (click)="runTests()" class="retest-btn">Run Tests Again</button>
      <button (click)="showChecker = false" class="close-btn" aria-label="Close accessibility checker">×</button>
    </div>
    <button *ngIf="!showChecker" 
            (click)="showChecker = true" 
            class="show-checker-btn"
            aria-label="Show accessibility test results">
      A11Y
    </button>
  `,
  styles: [`
    .accessibility-checker {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      max-height: 400px;
      background: white;
      border: 2px solid #007acc;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      overflow-y: auto;
    }
    
    .test-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
      padding: 8px;
      border-radius: 4px;
    }
    
    .test-item.pass {
      background: #d4edda;
      border-left: 4px solid #28a745;
    }
    
    .test-item.fail {
      background: #f8d7da;
      border-left: 4px solid #dc3545;
    }
    
    .test-item.warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
    }
    
    .test-name {
      font-weight: 600;
      margin-left: 8px;
    }
    
    .test-message {
      font-size: 0.85rem;
      margin: 4px 0 0 24px;
      color: #666;
    }
    
    .retest-btn, .close-btn {
      margin-top: 12px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .retest-btn {
      background: #007acc;
      color: white;
    }
    
    .close-btn {
      background: #dc3545;
      color: white;
      float: right;
    }
    
    .show-checker-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #007acc;
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 9999;
    }
  `]
})
export class AccessibilityCheckerComponent implements OnInit {
  showChecker = false;
  tests: AccessibilityTest[] = [];

  constructor(
    private el: ElementRef,
    private a11yService: AccessibilityService
  ) {}

  ngOnInit(): void {
    // Only show in development mode
    if (!environment.production) {
      setTimeout(() => this.runTests(), 1000);
    }
  }

  runTests(): void {
    this.tests = [];
    
    // Test 1: Check for skip links
    this.checkSkipLinks();
    
    // Test 2: Check for proper heading structure
    this.checkHeadingStructure();
    
    // Test 3: Check for alt text on images
    this.checkImageAltText();
    
    // Test 4: Check for form labels
    this.checkFormLabels();
    
    // Test 5: Check for ARIA landmarks
    this.checkARIALandmarks();
    
    // Test 6: Check color contrast (basic)
    this.checkColorContrast();
    
    // Test 7: Check keyboard navigation
    this.checkKeyboardNavigation();
  }

  private checkSkipLinks(): void {
    const skipLinks = document.querySelectorAll('.skip-link');
    this.tests.push({
      name: 'Skip Links',
      status: skipLinks.length > 0 ? 'pass' : 'fail',
      message: skipLinks.length > 0 
        ? `Found ${skipLinks.length} skip link(s)` 
        : 'No skip links found. Add skip links for keyboard users.'
    });
  }

  private checkHeadingStructure(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1Count = document.querySelectorAll('h1').length;
    
    this.tests.push({
      name: 'Heading Structure',
      status: h1Count === 1 ? 'pass' : h1Count > 1 ? 'warning' : 'fail',
      message: h1Count === 1 
        ? `Proper heading structure with ${headings.length} headings`
        : h1Count > 1 
          ? `Multiple H1 tags found (${h1Count}). Should have only one.`
          : 'No H1 tag found. Pages should have exactly one H1.'
    });
  }

  private checkImageAltText(): void {
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => 
      !img.getAttribute('alt') && !img.getAttribute('aria-hidden')
    );
    
    this.tests.push({
      name: 'Image Alt Text',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
      message: imagesWithoutAlt.length === 0
        ? `All ${images.length} images have alt text or are marked decorative`
        : `${imagesWithoutAlt.length} of ${images.length} images missing alt text`
    });
  }

  private checkFormLabels(): void {
    const inputs = document.querySelectorAll('input, select, textarea');
    const inputsWithoutLabels = Array.from(inputs).filter(input => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      
      return !label && !ariaLabel && !ariaLabelledBy;
    });
    
    this.tests.push({
      name: 'Form Labels',
      status: inputsWithoutLabels.length === 0 ? 'pass' : 'fail',
      message: inputsWithoutLabels.length === 0
        ? `All ${inputs.length} form controls have labels`
        : `${inputsWithoutLabels.length} of ${inputs.length} form controls missing labels`
    });
  }

  private checkARIALandmarks(): void {
    const landmarks = document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], header, nav, main, footer');
    
    this.tests.push({
      name: 'ARIA Landmarks',
      status: landmarks.length >= 3 ? 'pass' : 'warning',
      message: landmarks.length >= 3
        ? `Found ${landmarks.length} landmark elements`
        : `Only ${landmarks.length} landmarks found. Consider adding more semantic structure.`
    });
  }

  private checkColorContrast(): void {
    // This is a simplified check - in production, you'd use a more sophisticated tool
    const elements = document.querySelectorAll('p, span, div, a, button');
    let contrastIssues = 0;
    
    // This is a placeholder - real contrast checking requires color analysis
    this.tests.push({
      name: 'Color Contrast',
      status: 'warning',
      message: 'Manual color contrast testing recommended. Ensure 4.5:1 ratio for normal text, 3:1 for large text.'
    });
  }

  private checkKeyboardNavigation(): void {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    this.tests.push({
      name: 'Keyboard Navigation',
      status: focusableElements.length > 0 ? 'pass' : 'fail',
      message: focusableElements.length > 0
        ? `${focusableElements.length} focusable elements found`
        : 'No focusable elements found'
    });
  }
}

// Environment check (you might need to adjust this based on your setup)
const environment = { production: false };