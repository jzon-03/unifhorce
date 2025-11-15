import { Component } from '@angular/core';
import { ADSENSE_CONFIG } from '../../config/adsense.config';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent {
  adsenseConfig = ADSENSE_CONFIG;
}
