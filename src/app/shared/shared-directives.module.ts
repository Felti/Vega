import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Directives
import {
	HasOnePrivilegeDirective,
	HasPrivilegeDirective,
	HasRoleAndPrivilegeDirective,
	HasRoleDirective,
	IsOwnerOrHasPrivilegeDirective,
	IsOwnerOrHasPrivilegesDirective,
} from '../directives/has-permission.directive';
import { NgIfWithNotAvailableDirective } from '../directives/ng-if-with-not-available.directive';
import {
	MediumCenterLoadingDirective,
	MediumLoadingDirective,
	SmallLoadingDirective,
} from '../directives/loading.directive';

@NgModule({
	declarations: [
		HasRoleDirective,
		HasPrivilegeDirective,
		HasOnePrivilegeDirective,
		HasRoleAndPrivilegeDirective,
		NgIfWithNotAvailableDirective,
		MediumCenterLoadingDirective,
		MediumLoadingDirective,
		SmallLoadingDirective,
		IsOwnerOrHasPrivilegeDirective,
		IsOwnerOrHasPrivilegesDirective,
	],
	imports: [CommonModule],
	exports: [
		HasRoleDirective,
		HasPrivilegeDirective,
		HasOnePrivilegeDirective,
		HasRoleAndPrivilegeDirective,
		NgIfWithNotAvailableDirective,
		MediumCenterLoadingDirective,
		MediumLoadingDirective,
		SmallLoadingDirective,
		IsOwnerOrHasPrivilegeDirective,
		IsOwnerOrHasPrivilegesDirective,
	],
})
export class SharedDirectivesModule {}
