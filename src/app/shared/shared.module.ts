import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// PrimeNG
import { ColorPickerModule } from 'primeng/colorpicker';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PickListModule } from 'primeng/picklist';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgxDropzoneModule } from 'ngx-dropzone';
// Components

import {
  DirectiveSmallLoaderComponent,
  DirectiveMediumLoaderComponent,
  DirectiveMediumLoaderCenterComponent,
} from '../components/general/directives-templates/directive-loader/directive-loader.component';

// Modules
import { SharedDirectivesModule } from './shared-directives.module';
import { PageHeaderComponent } from '../components/general/page-header/page-header.component';
import { ConfirmDialogComponent } from '../components/general/confirm-dialog/confirm-dialog.component';
import { RefreshTokenComponent } from '../components/general/refresh-token/refresh-token.component';

@NgModule({
  declarations: [
    DirectiveSmallLoaderComponent,
    DirectiveMediumLoaderComponent,
    DirectiveMediumLoaderCenterComponent,
    RefreshTokenComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
  ],
  imports: [
    ColorPickerModule,
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    DropdownModule,
    PaginatorModule,
    MultiSelectModule,
    TooltipModule,
    MenuModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    CheckboxModule,
    PickListModule,
    ProgressSpinnerModule,
    MessageModule,
    MessagesModule,
    InputTextareaModule,
    AutoCompleteModule,
    SharedDirectivesModule,
    PasswordModule,
    ToastModule,
    ToggleButtonModule,
    DialogModule,
    NgxDropzoneModule,
  ],
  exports: [
    FormsModule,
    TableModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    PageHeaderComponent,
    DynamicDialogModule,
    ConfirmDialogModule,

    DropdownModule,
    PaginatorModule,

    MultiSelectModule,
    TooltipModule,
    MenuModule,
    PageHeaderComponent,
    CheckboxModule,
    PickListModule,
    ProgressSpinnerModule,
    DirectiveSmallLoaderComponent,
    DirectiveMediumLoaderComponent,

    DirectiveMediumLoaderCenterComponent,
    MessageModule,
    MessagesModule,
    InputTextareaModule,

    AutoCompleteModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogComponent,
    ToggleButtonModule,
    DialogModule,
    ColorPickerModule,
    NgxDropzoneModule,
  ],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class SharedModule {}
