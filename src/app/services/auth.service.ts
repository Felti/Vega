import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval, Observable, Subscription } from 'rxjs';
// PrimeNG
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// Services
import { UserService } from './user.service';

// Models
import { JwtToken } from '../models/jwt-token';
import { SimpleUserDTO, UserDTO } from '../models/user';
import { CustomResponse } from '../models/custom-response';

// Utils
import { hashString } from '../utils/string';
import { isListNotEmpty } from '../utils/list';
// Components
import { RefreshTokenComponent } from '../components/general/refresh-token/refresh-token.component';

// Enums
import { AuthType } from '../enums/auth-type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;

  refreshTokenDialogRef: DynamicDialogRef | null = null;

  onUserInfoChangesSubscription: Subscription | null = null;
  onObjectStateChangeSubscription: Subscription | null = null;

  constructor(
    // public
    public dialogService: DialogService,
    // private
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userService.sendSignOutSignal.subscribe((data) => {
      if (data) this.signOut();
    });
  }

  //detects token if it's expired if not activate websockets services
  detectTokenExpiry() {
    interval(5000).subscribe(() => {
      if (this.currentUrlInAuthenticatedLocation() && this.getToken()) {
        if (this.isTokenExpired()) {
          this.openRefreshTokenDialog('Votre session a expiré !');
        }
        if (!this.isTokenExpired()) {
          // do something
        }
      }
    });
  }

  currentUrlInAuthenticatedLocation(): boolean {
    return (
      this.router.url !== '/auth/se-connecter' &&
      this.router.url !== '/auth/mdp-oublie' &&
      this.router.url !== '/auth/reinitialisation-du-mdp'
    );
  }

  getUserDataForAccessKeyOps() {
    const accessKey = localStorage.getItem('ak_1000');
    this.userService
      .getByPrincipal()
      .subscribe((res: CustomResponse<UserDTO>) => {
        if (res?.data) {
          if (accessKey) {
            this.setAccessKeyData(accessKey);
          }
          this.setUserData(res.data);
        }
      });
  }

  openRefreshTokenDialog(messageObject: string) {
    if (!this.refreshTokenDialogRef) {
      const userData = localStorage.getItem('u_1000');

      // Stop watching until user is authenticated
      this.onUserInfoChangesSubscription?.unsubscribe();

      if (userData) {
        this.resetUserState();

        this.refreshTokenDialogRef = this.dialogService.open(
          RefreshTokenComponent,
          {
            header: 'Attention !',
            closeOnEscape: false,
            closable: false,
            style: {
              'max-width': '90%',
            },
            data: {
              login: JSON.parse(userData).login,
              messageObject,
              messageBody:
                'Pour continuer à utiliser la plateforme, Merci de vous reconnecter pour nous assurer de votre identité !',
            },
          }
        );
      } else this.router.navigateByUrl('/auth/se-connecter');
    }
  }

  signIn(login: string, password: string): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.apiUrl}/auth/sign-in`, {
      login,
      password,
    });
  }

  sendPasswordResetRequest(email: string): Observable<CustomResponse<any>> {
    return this.http.get<CustomResponse<any>>(
      `${this.apiUrl}/auth/password-reset/${email}`
    );
  }

  verifyPasswordResetToken(token: string): Observable<CustomResponse<any>> {
    return this.http.get<CustomResponse<any>>(
      `${this.apiUrl}/auth/verify-password-reset-token/${token}`
    );
  }

  resetPassword(
    token: string,
    password: string
  ): Observable<CustomResponse<any>> {
    return this.http.post<CustomResponse<any>>(
      `${this.apiUrl}/auth/change-password`,
      { token, password }
    );
  }

  setUserData(userDto: UserDTO | null): void {
    if (userDto) {
      if (isListNotEmpty(userDto.roles)) {
        localStorage.setItem(
          'ur_1003',
          JSON.stringify(userDto.roles.map((r) => r.name))
        );

        const userRolesHash = hashString(
          JSON.stringify(userDto.roles.map((r) => r.name))
        );
        if (userRolesHash) {
          userRolesHash.then((value) =>
            localStorage.setItem('urh_1004', value)
          );
        } else this.signOut();
      }
      if (isListNotEmpty(userDto.privileges)) {
        localStorage.setItem(
          'up_1005',
          JSON.stringify(userDto.privileges.map((p) => p.name))
        );

        const userPrivilegesHash = hashString(
          JSON.stringify(userDto.privileges.map((p) => p.name))
        );
        if (userPrivilegesHash) {
          userPrivilegesHash.then((value) =>
            localStorage.setItem('uph_1006', value)
          );
        } else this.signOut();
      }

      const simpleDto: SimpleUserDTO = {
        id: userDto.id,
        deleted: userDto?.deleted,
        createdAt: userDto?.createdAt,
        modifiedAt: userDto?.modifiedAt,
        login: userDto.login,
        email: userDto?.email,
        firstName: userDto?.firstName,
        lastName: userDto?.lastName,
        externalUserId: userDto?.externalUserId,
        phoneNumber: userDto?.phoneNumber,
        createdBy: userDto?.createdBy,
      };

      localStorage.setItem('u_1000', JSON.stringify(simpleDto));
    }
  }

  setTokenData(dto: JwtToken): void {
    localStorage.setItem('te_1002', dto.token);
    localStorage.setItem('t_1001', JSON.stringify(this.decodeToken(dto.token)));
  }

  setAccessKeyData(accessKey: string): void {
    localStorage.setItem('at_1000', AuthType.ACCESS_KEY);
    localStorage.setItem('ak_1000', accessKey);
  }

  signOut(): void {
    this.resetUserState();
    this.onObjectStateChangeSubscription?.unsubscribe();
    this.onUserInfoChangesSubscription?.unsubscribe();
    this.router.navigate(['/auth/se-connecter'], { replaceUrl: true });
  }

  resetUserState(): void {
    // User related
    localStorage.removeItem('u_1000');
    localStorage.removeItem('ur_1003');
    localStorage.removeItem('up_1005');
    localStorage.removeItem('urh_1004');
    localStorage.removeItem('uph_1006');
    // JWT related
    localStorage.removeItem('t_1001');
    localStorage.removeItem('te_1002');
    // Access Key related
    localStorage.removeItem('ak_1000');
    // Auth related
    localStorage.removeItem('at_1000');
    localStorage.removeItem('initial_location');
  }

  // Token related functions
  getToken(): string | null {
    return localStorage.getItem('te_1002') != null
      ? localStorage.getItem('te_1002')
      : null;
  }

  getTokenExpirationDate(token: string | null = this.getToken()): Date | null {
    if (token) {
      const decodedToken: any = this.decodeToken(token);

      if (!decodedToken || !decodedToken.hasOwnProperty('exp')) return null;

      const date = new Date(0);
      date.setUTCSeconds(decodedToken.exp);

      return date;
    }

    return null;
  }

  isTokenExpired(
    token: string | null = this.getToken(),
    offsetSeconds?: number
  ): boolean {
    if (!token || token === '') return true;

    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) return false;

    return date.valueOf() <= new Date().valueOf() + offsetSeconds * 1000;
  }

  decodeToken(token: string | null): any {
    if (!token || token === '') return null;

    const parts = token.split('.');

    if (parts.length !== 3)
      throw new Error("The inspected token doesn't appear to be a JWT.");

    const decoded = this.urlBase64Decode(parts[1]);

    if (!decoded) throw new Error('Cannot decode the token.');

    return JSON.parse(decoded);
  }

  urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    return this.b64DecodeUnicode(output);
  }

  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      Array.prototype.map
        .call(this.b64decode(str), (c: any) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  private b64decode(str: string): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1)
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );

    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
}
