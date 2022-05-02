import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
// Utils
import { getLowestRoleIndex, getRoleIndex } from '../utils/role';

@Injectable({
	providedIn: 'root',
})
export class HasAccessRightGuard implements CanActivate {
	constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
		// Role/Privilege checking
		const userRoles = this.userService.getLocalUserRoles();
		const userPrivileges = this.userService.getLocalUserPrivileges();

		// Send to sign in page if user has no roles
		if (userRoles.length == 0) return this.router.parseUrl('/auth/se-connecter');

		// Get route's minimum required role
		const minimumRoleNeeded: string = route.data['minimumRoleNeeded'];
		// Get route's minimum required privilege
		const minimumPrivilegeNeeded: string = route.data['minimumPrivilegeNeeded'];

		if (minimumRoleNeeded) {
			const minimumRoleNeededIndex = getRoleIndex(minimumRoleNeeded);

			// Get user's superior role (lowest in role index number)
			const userLowestRoleIndex = getLowestRoleIndex(userRoles);

			if (minimumRoleNeededIndex && userLowestRoleIndex) {
				// Check if the privilege exists
				let requiredPrivilege: boolean | string | undefined = undefined;
				if (minimumPrivilegeNeeded) {
					requiredPrivilege = userPrivileges.find(p => p === minimumPrivilegeNeeded);
				} else requiredPrivilege = true;

				// Test on role and privilege at once
				if (userLowestRoleIndex <= minimumRoleNeededIndex && requiredPrivilege) return true;
				return this.router.parseUrl('/acces-refuse');
			}

			this.authService.resetUserState();
			return this.router.parseUrl('/auth/se-connecter');
		}

		// Allow since there is no role, privilege to test against
		return true;
	}
}
