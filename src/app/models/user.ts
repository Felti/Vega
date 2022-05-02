import { BaseDTO } from './base';
import { RoleDTO } from './role';
import { PrivilegeDTO } from './privilege';

export interface UserDTO extends BaseDTO {
	email: string;
	phoneNumber: string;
	login: string;
	lastName: string;
	firstName: string;
	externalUserId: string;
	isEnabled?: boolean;

	roles: RoleDTO[];
	privileges: PrivilegeDTO[];
}

export interface SimpleUserDTO extends BaseDTO {
	email: string;
	phoneNumber: string;
	login: string;
	lastName: string;
	firstName: string;
	externalUserId: string;
	isEnabled?: boolean;
}

export interface FilterUserDTO {
	id: string;
	name: string;
}

export interface CreateSingleUser extends BaseDTO {
	firstName: string;
	lastName: string;
	email: string;
	login: string;
	externalUserId: number;
	role: string;
}

export interface UpdateSingleUser extends CreateSingleUser {
	id: number;
}

export interface UserRolesPrivilegesModificationDTO {
	id: number;
	rolesIds: number[];
	privilegesIds: number[];
}
