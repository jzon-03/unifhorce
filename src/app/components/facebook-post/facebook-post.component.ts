import { Component, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare global {
  interface Window {
    FB: any;
  }
}

@Component({
    selector: 'app-facebook-post',
    templateUrl: './facebook-post.component.html',
    styleUrl: './facebook-post.component.scss',
    standalone: false
})
export class FacebookPostComponent implements AfterViewInit {
  @Input() postUrl: string = '';
  @Input() width: number = 500;
  @Input() height: number = 545;
  @Input() showText: boolean = true;
  @Input() title: string = '';
  @Input() description: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    // Parse Facebook widgets after view initialization
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.XFBML.parse();
    }
  }

  get safeEmbedUrl(): SafeResourceUrl {
    if (!this.postUrl) return '';
    
    const encodedUrl = encodeURIComponent(this.postUrl);
    const embedUrl = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=${this.showText}&width=${this.width}`;
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
