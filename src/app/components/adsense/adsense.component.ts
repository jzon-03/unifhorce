import { Component, Input, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-adsense',
    templateUrl: './adsense.component.html',
    styleUrl: './adsense.component.scss',
    standalone: false
})
export class AdsenseComponent implements AfterViewInit, OnDestroy {
  @Input() adSlot: string = '';
  @Input() adFormat: string = 'auto';
  @Input() fullWidthResponsive: boolean = true;
  @Input() display: string = 'block';
  @Input() adStyle: any = {};

  private adPushed = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Only load ads in browser (not during SSR)
    if (isPlatformBrowser(this.platformId) && !this.adPushed) {
      try {
        // Push ad after a slight delay to ensure DOM is ready
        setTimeout(() => {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          this.adPushed = true;
        }, 100);
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
    this.adPushed = false;
  }
}
