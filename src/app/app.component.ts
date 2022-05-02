import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';
import { ResolutionService } from './services/resolution.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private title: Title,
    private authService: AuthService,
    private globalService: GlobalService,
    private primengConfig: PrimeNGConfig,
    private resolutionService: ResolutionService
  ) {}

  ngOnInit() {
    this.title.setTitle('Vega by Rakkata');

    // Styling and responsivness
    this.onWindowResize();
    this.primengConfig.ripple = true;

    // Token expiry
    this.authService.detectTokenExpiry();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resolutionService.screenResolution = window.innerWidth;

    if (this.resolutionService.screenResolution < 768)
      this.resolutionService.isMobileResolution.next(true);
    else this.resolutionService.isMobileResolution.next(false);
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowUnload(event: any): void {
    if (this.globalService.isDirty) {
      event.preventDefault();
      event.returnValue = !this.globalService.isDirty;
    }
  }
}
