import { Component } from '@angular/core';

// Small Loader

@Component({
	template: `
		<div class="directive-loader-wrapper">
			<p-progressSpinner
				strokeWidth="2"
				styleClass="custom-spinner"
				animationDuration="1s"
				[style]="{ width: '50px', height: '50px' }"
			></p-progressSpinner>
		</div>
	`,
	styleUrls: ['../../../../../assets/scss/directive-loader.scss'],
})
export class DirectiveSmallLoaderComponent {}

// Medium Loader

@Component({
	template: `
		<div class="directive-loader-wrapper">
			<p-progressSpinner
				strokeWidth="2"
				styleClass="custom-spinner"
				animationDuration="1s"
				[style]="{ width: '75px', height: '75px' }"
			></p-progressSpinner>
		</div>
	`,
	styleUrls: ['../../../../../assets/scss/directive-loader.scss'],
})
export class DirectiveMediumLoaderComponent {}

// Medium Center Loader

@Component({
	template: `
		<div class="directive-loader-wrapper">
			<p-progressSpinner
				strokeWidth="2"
				styleClass="custom-spinner"
				animationDuration="1s"
				[style]="{
					width: '75px',
					height: '75px',
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)'
				}"
			></p-progressSpinner>
		</div>
	`,
	styleUrls: ['../../../../../assets/scss/directive-loader.scss'],
})
export class DirectiveMediumLoaderCenterComponent {}
