import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  CanActivateChild,
  CanLoad,
} from '@angular/router';
// Services
import { AuthService } from '../services/auth.service';
// Enums
import { AuthType } from '../enums/auth-type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard
  implements CanActivate, CanActivateChild, CanLoad
{
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean | UrlTree {
    return this.checkIfUserIsAuthenticated();
  }

  canActivate(): boolean | UrlTree {
    return this.checkIfUserIsAuthenticated();
  }

  canActivateChild(): boolean | UrlTree {
    return this.checkIfUserIsAuthenticated();
  }

  private checkIfUserIsAuthenticated(): boolean | UrlTree {
    const authType = localStorage.getItem('at_1000');
    const userData = localStorage.getItem('u_1000');
    if (
      (authType === AuthType.JWT && !this.authService.isTokenExpired()) ||
      userData
    )
      return true;

    return this.router.parseUrl('/auth/se-connecter');
  }
}
