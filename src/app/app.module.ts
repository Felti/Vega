import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { MainHeaderComponent } from './components/layout/main-header/main-header.component';
import { MainFooterComponent } from './components/layout/main-footer/main-footer.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { SharedDirectivesModule } from './shared/shared-directives.module';
import { SharedModule } from './shared/shared.module';
import { interceptorProviders } from './interceptors/interceptors.provider';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    MainFooterComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MenuModule,
    ToastModule,
    ButtonModule,
    ProgressSpinnerModule,
    SharedDirectivesModule,
    DynamicDialogModule,
    AccordionModule,
    TooltipModule,
    SharedModule,
  ],
  providers: [interceptorProviders, MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
