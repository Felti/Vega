import { Injectable } from '@angular/core';
import { map, mergeAll } from 'rxjs/operators';
import { asapScheduler, fromEvent, scheduled } from 'rxjs';
// Services
import { MessageToastService } from './message-toast.service';
// Enums
import { ToastSeverity, ToastSummary } from '../enums/toast-config';

@Injectable({
	providedIn: 'root',
})
export class GlobalService {
	constructor(private messageToastService: MessageToastService) {}

	isDirty: boolean = false;

	checkInternetActivity() {
		return scheduled(
			[fromEvent(window, 'online').pipe(map(() => true)), fromEvent(window, 'offline').pipe(map(() => false))],
			asapScheduler
		).pipe(mergeAll());
	}

	backEndUnreachable() {
		this.messageToastService.displayToast(
			'Le système est temporairement indisponible. Nous ne pouvons pas donner suite à votre requête, veuillez réessayer dans quelques instants !',
			ToastSeverity.ERROR,
			ToastSummary.ERROR,
			15000
		);
	}
}
