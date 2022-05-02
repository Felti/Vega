import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// Services
import { UserService } from '../services/user.service';
// Utils
import { hasRolePermission } from '../utils/role';
// Models
import { SimpleUserDTO } from '../models/user';

// hasRole

@Directive({
	selector: '[hasRole]',
})
export class HasRoleDirective {
	@Input()
	set hasRole(strippedRoleName: string) {
		if (
			strippedRoleName &&
			hasRolePermission(`ROLE_${strippedRoleName.toUpperCase()}`, this.userService.getLocalUserRoles())
		) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else this.viewContainerRef.clear();
	}

	constructor(
		private userService: UserService,
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {}
}

// hasPrivilege

@Directive({
	selector: '[hasPrivilege]',
})
export class HasPrivilegeDirective {
	privileges: string[] = [];

	@Input()
	set hasPrivilege(privilegeName: string) {
		if (privilegeName && this.privileges.indexOf(privilegeName.toUpperCase()) > -1) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else this.viewContainerRef.clear();
	}

	constructor(
		private userService: UserService,
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		this.privileges = this.userService.getLocalUserPrivileges();
	}
}

// hasOnePrivilege

@Directive({
	selector: '[hasOnePrivilege]',
})
export class HasOnePrivilegeDirective {
	privileges: string[] = [];

	@Input()
	set hasOnePrivilege(privilegesNames: string[]) {
		for (const privilegeName of privilegesNames) {
			if (this.privileges.indexOf(privilegeName.toUpperCase()) > -1) {
				this.viewContainerRef.createEmbeddedView(this.templateRef);
				break;
			} else this.viewContainerRef.clear();
		}
	}

	constructor(
		private userService: UserService,
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		this.privileges = this.userService.getLocalUserPrivileges();
	}
}

// hasRoleAndPrivilege

@Directive({
	selector: '[hasRoleAndPrivilege]',
})
export class HasRoleAndPrivilegeDirective {
	privileges: string[] = [];

	@Input()
	set hasRoleAndPrivilege(roleAndPrivilege: string[]) {
		if (
			roleAndPrivilege &&
			roleAndPrivilege.length === 2 &&
			this.userHasPrivilege(roleAndPrivilege[1].toUpperCase()) &&
			hasRolePermission(`ROLE_${roleAndPrivilege[0].toUpperCase()}`, this.userService.getLocalUserRoles())
		) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else this.viewContainerRef.clear();
	}

	constructor(
		private userService: UserService,
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		this.privileges = this.userService.getLocalUserPrivileges();
	}

	userHasPrivilege(privilegeName: string): boolean {
		return this.privileges.indexOf(privilegeName) > -1;
	}
}

// isOwnerOrHasPrivilege

@Directive({
	selector: '[isOwnerOrHasPrivilege]',
})
export class IsOwnerOrHasPrivilegeDirective {
	privileges: string[] = [];
	simpleUserDto: SimpleUserDTO | null = null;

	@Input()
	set isOwnerOrHasPrivilege(userIdAndPrivilege: string[]) {
		if (
			userIdAndPrivilege &&
			userIdAndPrivilege.length === 2 &&
			(this.userHasPrivilege(userIdAndPrivilege[1].toUpperCase()) ||
				(this.simpleUserDto && Number(this.simpleUserDto.id) === Number(userIdAndPrivilege[0])))
		) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else this.viewContainerRef.clear();
	}

	constructor(
		private userService: UserService,
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		this.simpleUserDto = this.userService.getLocalUser();
		this.privileges = this.userService.getLocalUserPrivileges();
	}

	userHasPrivilege(privilegeName: string): boolean {
		return this.privileges.indexOf(privilegeName) > -1;
	}
}

// isOwnerOrHasPrivilege

@Directive({
	selector: '[isOwnerOrHasPrivileges]',
})
export class IsOwnerOrHasPrivilegesDirective {
	privileges: string[] = [];
	simpleUserDto: SimpleUserDTO | null = null;

	@Input()
	set isOwnerOrHasPrivileges(userIdAndPrivileges: string[]) {
		if (
			userIdAndPrivileges &&
			(this.userHasPrivileges(userIdAndPrivileges) ||
				(this.simpleUserDto && Number(this.simpleUserDto.id) === Number(userIdAndPrivileges[0])))
		) {
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		} else this.viewContainerRef.clear();
	}

	constructor(
		private userService: UserService,
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		this.simpleUserDto = this.userService.getLocalUser();
		this.privileges = this.userService.getLocalUserPrivileges();
	}

	userHasPrivileges(privileges: string[]): boolean {
		if (privileges && privileges.length > 0) {
			const alteredPrivileges = [...privileges];
			alteredPrivileges.shift();

			return alteredPrivileges.some(privilege => {
				return this.privileges.indexOf(privilege.toUpperCase()) > -1;
			});
		}

		return false;
	}
}
