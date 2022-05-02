import { Component, ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[ngIfWithNotAvailable]',
})
export class NgIfWithNotAvailableDirective {
	@Input() set ngIfWithNotAvailable(value: any) {
		if (value) this.viewContainerRef.createEmbeddedView(this.templateRef);
		else {
			const factory = this.componentFactoryResolver.resolveComponentFactory(ValueNotAvailableComponent);
			this.viewContainerRef.createComponent(factory);
		}
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}
}

@Component({
	template: `<span>N/A</span>`,
})
class ValueNotAvailableComponent {}
