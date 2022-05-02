import { Injectable } from '@angular/core';
// PrimeNG
import { MessageService } from 'primeng/api';
// Enums
import { ToastSeverity, ToastSummary } from '../enums/toast-config';

@Injectable({
	providedIn: 'root',
})
export class MessageToastService {
	constructor(private messageService: MessageService) {}

	displayToast(
		detail: string | null,
		severity: ToastSeverity = ToastSeverity.SUCCESS,
		summary: ToastSummary = ToastSummary.SUCCESS,
		life?: number
	) {
		if (severity === ToastSeverity.ERROR) {
			this.messageService.add({
				life: !life ? life : 5000,
				closable: true,
				severity,
				summary,
				detail:
					detail == null
						? 'Une erreur s’est produite, pas de détails, réessayer plus tard ou contacter votre administrateur.'
						: detail,
			});
		} else {
			this.messageService.add({
				life: !life ? life : 5000,
				closable: true,
				severity,
				summary,
				detail: detail == null ? '' : detail,
			});
		}
	}

	displayStickyToast(detail: string, summary: string) {
		this.messageService.add({
			severity: ToastSeverity.INFO,
			summary: summary,
			detail: detail,
			sticky: true,
		});
	}

	displayWsToast(detail: string, summary: string) {
		this.messageService.add({
			key: 'ws-notif',
			severity: 'info',
			life: 5000,
			summary: summary,
			detail: detail,
			closable: true,
		});
	}

	clear() {
		this.messageService.clear();
	}
}
