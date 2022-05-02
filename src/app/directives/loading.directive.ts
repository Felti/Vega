import {
	Input,
	Directive,
	TemplateRef,
	ComponentRef,
	ViewContainerRef,
	ComponentFactory,
	ComponentFactoryResolver,
} from '@angular/core';
// Components
import {
	DirectiveSmallLoaderComponent,
	DirectiveMediumLoaderComponent,
	DirectiveMediumLoaderCenterComponent,
} from '../components/general/directives-templates/directive-loader/directive-loader.component';

// Small Loader

@Directive({
	selector: '[smallLoading]',
})
export class SmallLoadingDirective {
	loadingFactory: ComponentFactory<DirectiveSmallLoaderComponent>;
	loadingComponent: ComponentRef<DirectiveSmallLoaderComponent> | null = null;

	@Input()
	set smallLoading(loading: boolean) {
		this.viewContainerRef.clear();

		if (loading) {
			this.loadingComponent = this.viewContainerRef.createComponent(this.loadingFactory);
		} else this.viewContainerRef.createEmbeddedView(this.templateRef);
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(DirectiveSmallLoaderComponent);
	}
}

// Medium Loader

@Directive({
	selector: '[mediumLoading]',
})
export class MediumLoadingDirective {
	loadingFactory: ComponentFactory<DirectiveMediumLoaderComponent>;
	loadingComponent: ComponentRef<DirectiveMediumLoaderComponent> | null = null;

	@Input()
	set mediumLoading(loading: boolean) {
		this.viewContainerRef.clear();

		if (loading) {
			this.loadingComponent = this.viewContainerRef.createComponent(this.loadingFactory);
		} else this.viewContainerRef.createEmbeddedView(this.templateRef);
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(DirectiveMediumLoaderComponent);
	}
}

// Medium Sized Centered Loader

@Directive({
	selector: '[mediumCenterLoading]',
})
export class MediumCenterLoadingDirective {
	loadingFactory: ComponentFactory<DirectiveMediumLoaderCenterComponent>;
	loadingComponent: ComponentRef<DirectiveMediumLoaderCenterComponent> | null = null;

	@Input()
	set mediumCenterLoading(loading: boolean) {
		this.viewContainerRef.clear();

		if (loading) {
			this.loadingComponent = this.viewContainerRef.createComponent(this.loadingFactory);
		} else this.viewContainerRef.createEmbeddedView(this.templateRef);
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(DirectiveMediumLoaderCenterComponent);
	}
}
