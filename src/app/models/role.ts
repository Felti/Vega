import { BaseDTO } from './base';
import { PrivilegeDTO } from './privilege';

export interface RoleDTO extends BaseDTO {
	name: string;
	privileges: PrivilegeDTO[];
}
