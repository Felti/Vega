import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, CanActivateChild, Router } from '@angular/router';
// Services
import { AuthService } from '../services/auth.service';
// Enums
import { AuthType } from '../enums/auth-type';

@Injectable({
	providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanLoad, CanActivateChild {
	constructor(private authService: AuthService, private router: Router) {}

	canLoad(): boolean | UrlTree {
		return this.checkIfUserIsAuthenticated();
	}

	canActivateChild(): boolean | UrlTree {
		return this.checkIfUserIsAuthenticated();
	}

	private checkIfUserIsAuthenticated(): boolean | UrlTree {
		const authType = localStorage.getItem('at_1000');
		const accessKey = localStorage.getItem('ak_1000');

		if (
			authType == null ||
			(authType === AuthType.JWT && this.authService.isTokenExpired()) ||
			(authType === AuthType.ACCESS_KEY && accessKey == null)
		) {
			return true;
		}

		const userData = localStorage.getItem('u_1000');

		if (authType === AuthType.ACCESS_KEY && userData == null) {
			this.authService.getUserDataForAccessKeyOps();
		}

		return this.router.parseUrl('/contributions');
	}
}
