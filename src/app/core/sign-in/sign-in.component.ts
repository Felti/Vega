import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// Services
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { MessageToastService } from 'src/app/services/message-toast.service';
// Enums
import { ToastSeverity, ToastSummary } from 'src/app/enums/toast-config';
// Models
import { UserDTO } from 'src/app/models/user';
import { JwtToken } from 'src/app/models/jwt-token';
import { CustomResponse } from 'src/app/models/custom-response';

@Component({
  selector: 'ged-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  login: string | null = null;
  password: string | null = null;

  buttonDisabled: boolean = false;

  isOnline: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private globalService: GlobalService,
    private messageToastService: MessageToastService
  ) {}

  ngOnInit(): void {
    // Internet connection checking
    this.globalService
      .checkInternetActivity()
      .subscribe((res) => (this.isOnline = res));
  }

  signIn(): void {
    if (this.login && this.password) {
      this.buttonDisabled = true;

      this.authService.signIn(this.login, this.password).subscribe(
        (data: JwtToken) => {
          if (data && data.token && this.login) {
            this.authService.setTokenData(data);

            this.userService.getByLogin(this.login.toLowerCase()).subscribe(
              (res: CustomResponse<UserDTO>) => {
                if (
                  res &&
                  res.data &&
                  res.data.privileges &&
                  res.data.privileges.length > 0 &&
                  res.data.roles &&
                  res.data.roles.length > 0
                ) {
                  this.authService.setUserData(res.data);
                  setTimeout(
                    () =>
                      this.router.navigate(['/dashboard'], {
                        replaceUrl: true,
                      }),
                    1000
                  );
                } else {
                  this.buttonDisabled = false;
                  this.authService.resetUserState();
                  this.router.navigate(['/auth/se-connecter'], {
                    replaceUrl: true,
                  });

                  this.messageToastService.displayToast(
                    "Vous n'êtes pas autorisé à vous connecter à la plateforme !",
                    ToastSeverity.ERROR,
                    ToastSummary.ERROR
                  );
                }
              },
              (error) => {
                this.buttonDisabled = false;
                this.messageToastService.displayToast(
                  'Les données de cet utilisateur ne peuvent pas être récupérées.',
                  ToastSeverity.ERROR,
                  ToastSummary.ERROR
                );
              }
            );
          }
        },
        (error) => {
          this.buttonDisabled = false;
          this.messageToastService.displayToast(
            'Le login et/ou mot de passe sont incorrects.',
            ToastSeverity.ERROR,
            ToastSummary.ERROR
          );
        }
      );
    }
  }
}
