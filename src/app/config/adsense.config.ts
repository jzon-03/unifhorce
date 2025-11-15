/**
 * Google AdSense Configuration
 * 
 * This file contains all AdSense ad slot IDs for easy management.
 * Replace the placeholder values with your actual ad slot IDs from Google AdSense.
 * 
 * How to get your ad slot IDs:
 * 1. Go to https://www.google.com/adsense
 * 2. Navigate to Ads > Overview
 * 3. Create new ad units or use existing ones
 * 4. Copy the data-ad-slot value for each ad unit
 * 5. Replace the values below
 */

export const ADSENSE_CONFIG = {
  // Publisher ID (already in use)
  publisherId: 'ca-pub-7601194250852039',
  
  // Ad Slots - Replace these with your actual slot IDs
  adSlots: {
    // Home page ads
    homeAfterAbout: '1234567890',      // Ad after About section
    homeAfterTestimonials: '1234567891', // Ad after Testimonials section
    homeAfterResources: '1234567892',    // Ad after Resources section
    
    // Sidebar ads (for future use)
    sidebarTop: '1234567893',
    sidebarBottom: '1234567894',
    
    // Article/Blog ads (for future use)
    articleTop: '1234567895',
    articleMiddle: '1234567896',
    articleBottom: '1234567897',
    
    // Footer ad (for future use)
    footer: '1234567898',
    
    // Mobile-specific ads (for future use)
    mobileTop: '1234567899',
    mobileBottom: '1234567900'
  },
  
  // Ad formats
  formats: {
    auto: 'auto',
    rectangle: 'rectangle',
    horizontal: 'horizontal',
    vertical: 'vertical'
  },
  
  // Display settings
  display: {
    block: 'block',
    inlineBlock: 'inline-block'
  }
};

/**
 * Usage example:
 * 
 * <app-adsense 
 *   [adSlot]="adsenseConfig.adSlots.homeAfterAbout"
 *   [adFormat]="adsenseConfig.formats.auto"
 *   [fullWidthResponsive]="true">
 * </app-adsense>
 */
