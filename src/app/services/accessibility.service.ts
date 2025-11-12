import { Injectable } from '@angular/core';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private focusTraps = new Map<string, FocusTrap>();

  constructor(private focusTrapFactory: FocusTrapFactory) { }

  /**
   * Creates and activates a focus trap for modal dialogs and mobile menus
   */
  createFocusTrap(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const focusTrap = this.focusTrapFactory.create(element);
      focusTrap.focusInitialElement();
      this.focusTraps.set(elementId, focusTrap);
    }
  }

  /**
   * Destroys a focus trap and returns focus to the previous element
   */
  destroyFocusTrap(elementId: string): void {
    const focusTrap = this.focusTraps.get(elementId);
    if (focusTrap) {
      focusTrap.destroy();
      this.focusTraps.delete(elementId);
    }
  }

  /**
   * Announces important messages to screen readers
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * Sets focus to an element with proper error handling
   */
  setFocus(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Use setTimeout to allow for DOM updates
      setTimeout(() => {
        element.focus();
      }, 100);
    }
  }

  /**
   * Validates color contrast ratio
   */
  validateColorContrast(foregroundColor: string, backgroundColor: string): number {
    // This is a simplified contrast ratio calculation
    // In a production app, you'd use a more robust library like 'color'
    const rgb1 = this.hexToRgb(foregroundColor);
    const rgb2 = this.hexToRgb(backgroundColor);
    
    if (!rgb1 || !rgb2) return 0;
    
    const l1 = this.getLuminance(rgb1);
    const l2 = this.getLuminance(rgb2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Checks if contrast ratio meets WCAG guidelines
   */
  meetsContrastRequirements(ratio: number, isLargeText: boolean = false): boolean {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }

  private hexToRgb(hex: string): {r: number, g: number, b: number} | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private getLuminance(rgb: {r: number, g: number, b: number}): number {
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;

    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Handle keyboard navigation for custom components
   */
  handleKeyboardNavigation(event: KeyboardEvent, elements: HTMLElement[]): void {
    const currentIndex = elements.findIndex(el => el === document.activeElement);
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
        elements[nextIndex].focus();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
        elements[prevIndex].focus();
        break;
      case 'Home':
        event.preventDefault();
        elements[0].focus();
        break;
      case 'End':
        event.preventDefault();
        elements[elements.length - 1].focus();
        break;
    }
  }
}