import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SharedDirectivesModule } from 'src/app/shared/shared-directives.module';
import { SignInComponent } from '../sign-in/sign-in.component';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
		AuthRoutingModule,
		FormsModule,
		ButtonModule,
		InputTextModule,
		PasswordModule,
		SharedDirectivesModule,
  ]
})
export class AuthModule { }
