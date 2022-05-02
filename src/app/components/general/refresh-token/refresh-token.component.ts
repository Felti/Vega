import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
// PrimeNG
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// Services
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MessageToastService } from 'src/app/services/message-toast.service';
// Enums
import { ToastSeverity, ToastSummary } from 'src/app/enums/toast-config';
// Models
import { UserDTO } from 'src/app/models/user';
import { JwtToken } from 'src/app/models/jwt-token';
import { CustomResponse } from 'src/app/models/custom-response';

@Component({
	selector: 'ged-refresh-token',
	templateUrl: './refresh-token.component.html',
	styleUrls: ['./refresh-token.component.scss'],
})
export class RefreshTokenComponent implements OnInit {
	login: string | null = null;
	password: string | null = null;
	messageBody: string | null = null;
	messageObject: string | null = null;

	buttonDisabled: boolean = false;

	constructor(
		// public
		public dynamicDialogRef: DynamicDialogRef,
		public dynamicDialogConfig: DynamicDialogConfig,
		// private
		private router: Router,
		private authService: AuthService,
		private userService: UserService,
		private messageToastService: MessageToastService
	) {}

	ngOnInit(): void {
		const login: string | null = this.dynamicDialogConfig.data?.login;
		this.messageBody = this.dynamicDialogConfig.data?.messageBody;
		this.messageObject = this.dynamicDialogConfig.data?.messageObject;
		if (login) this.login = login;
	}

	signIn(): void {
		if (this.login && this.password) {
			this.buttonDisabled = true;

			this.authService.signIn(this.login, this.password).subscribe(
				(data: JwtToken) => {
					if (data && data.token && this.login) {
						this.authService.setTokenData(data);

						this.userService.getByLogin(this.login).subscribe(
							(res: CustomResponse<UserDTO>) => {
								if (res?.data) {
									this.authService.setUserData(res.data);
									// Reset values
									this.authService.refreshTokenDialogRef = null;
									// Exit current view
									this.dynamicDialogRef.close();
								}
							},
							error => {
								this.router.navigate(['/auth/se-connecter'], { replaceUrl: true });

								this.messageToastService.displayToast(
									'Les données de cet utilisateur ne peuvent pas être récupérées.',
									ToastSeverity.ERROR,
									ToastSummary.ERROR
								);
							}
						);
					}
				},
				error => {
					this.buttonDisabled = false;

					this.messageToastService.displayToast(
						'Le mot de passe est incorrect.',
						ToastSeverity.ERROR,
						ToastSummary.ERROR
					);
				}
			);
		}
	}

	signOut() {
		this.authService.signOut();
		this.dynamicDialogRef.close();
	}

	@HostListener('window:beforeunload', ['$event'])
	blockClosingTab(event: any) {
		event.returnValue = true;
	}
}
