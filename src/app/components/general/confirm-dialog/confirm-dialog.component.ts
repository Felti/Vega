import { Component, OnInit } from '@angular/core';
// Services
import { ResolutionService } from 'src/app/services/resolution.service';

@Component({
	selector: 'ged-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
	// Responsiveness
	isMobile: boolean = false;

	constructor(private resolutionService: ResolutionService) {}

	ngOnInit(): void {
		this.resolutionService.isMobileResolution.subscribe(res => (this.isMobile = res));
	}
}
