import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
// Services
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class CanLeaveGuard implements CanDeactivate<any> {
	constructor(private auth: AuthService) {}

	canDeactivate(
		component: any,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): boolean {
		if ('/auth/se-connecter' === nextState?.url || currentState.url === '/auth/se-connecter') return true;

		if (this.auth.getToken() && this.auth.isTokenExpired()) {
			this.auth.openRefreshTokenDialog('Votre session a expiré !');
			return false;
		}

		return true;
	}
}
