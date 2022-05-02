import { Role, RoleIndex } from '../enums/role';

const getRoleIndex = (roleName: string | Role | null): number | null => {
	if (roleName) {
		switch (roleName) {
			case Role.ROLE_ROOT:
				return RoleIndex.ROLE_ROOT;
			case Role.ROLE_ADMIN:
				return RoleIndex.ROLE_ADMIN;
			case Role.ROLE_MODERATOR:
				return RoleIndex.ROLE_MODERATOR;
			case Role.ROLE_VIEWER:
				return RoleIndex.ROLE_VIEWER;
			case Role.ROLE_USER:
				return RoleIndex.ROLE_USER;
			default:
				return null;
		}
	}

	return null;
};

const getLowestRoleIndex = (roles: string[] | null): number | null => {
	if (roles && roles.length > 0) {
		let indexes: number[] = [];
		for (const r of roles) {
			const roleIndex: number | null = getRoleIndex(r);
			if (roleIndex) indexes.push(roleIndex);
		}

		if (indexes.length > 0) return Math.min(...indexes);

		return null;
	}

	return null;
};

const hasRolePermission = (minimumRoleNeeded: string | undefined | null, userRoles: string[]): boolean => {
	if (minimumRoleNeeded && userRoles.length > 0) {
		const roleIndex: number | null = getRoleIndex(minimumRoleNeeded);
		if (roleIndex) {
			const userLowestRoleIndex = getLowestRoleIndex(userRoles);
			if (userLowestRoleIndex && userLowestRoleIndex <= roleIndex) return true;
			return false;
		}
		return false;
	}

	return false;
};

export { getRoleIndex, getLowestRoleIndex, hasRolePermission };
