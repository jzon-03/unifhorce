import { Component } from '@angular/core';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor(private a11yService: AccessibilityService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Update aria-expanded attribute for accessibility
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
    }
    
    // Toggle nav-menu visibility class
    const navMenu = document.querySelector('.nav-menu') as HTMLElement;
    if (navMenu) {
      if (this.isMobileMenuOpen) {
        navMenu.classList.add('mobile-active');
        navMenu.setAttribute('id', 'mobile-nav-menu');
        
        // Create focus trap for mobile menu
        this.a11yService.createFocusTrap('mobile-nav-menu');
        
        // Announce to screen readers
        this.a11yService.announceToScreenReader('Navigation menu opened', 'assertive');
      } else {
        navMenu.classList.remove('mobile-active');
        
        // Destroy focus trap
        this.a11yService.destroyFocusTrap('mobile-nav-menu');
        
        // Return focus to hamburger button
        this.a11yService.setFocus('hamburger-button');
        
        // Announce to screen readers
        this.a11yService.announceToScreenReader('Navigation menu closed', 'assertive');
      }
    }
  }
}
