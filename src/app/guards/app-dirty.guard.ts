import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
// Interfaces
import { ComponentCanDeactivate } from '../interfaces/component-can-deactivate';
// Services
import { GlobalService } from '../services/global.service';

@Injectable({
	providedIn: 'root',
})
export class AppDirtyGuard implements CanDeactivate<ComponentCanDeactivate> {
	constructor(private globalService: GlobalService) {}

	canDeactivate(
		component: ComponentCanDeactivate,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): boolean {
		if (component.canDeactivate()) return true;
		else {
			const confirmationResponse = confirm(
				'Vous avez des modifications non enregistrées ! Souhaiteriez-vous quitter quand même?'
			);
			this.globalService.isDirty = !confirmationResponse;
			return confirmationResponse;
		}
	}
}
