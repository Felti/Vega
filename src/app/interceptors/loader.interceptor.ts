import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
// Services
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

	constructor(private loaderService: LoaderService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!request.url.includes('stats')) this.loaderService.isLoading.next(true);

		this.requests.push(request);

		return new Observable(observer => {
			const subscription = next.handle(request).subscribe(
				event => {
					if (event instanceof HttpResponse) {
						this.removeRequest(request);
						observer.next(event);
					}
				},
				err => {
					this.removeRequest(request);
					observer.error(err);
				},
				() => {
					this.removeRequest(request);
					observer.complete();
				}
			);
			return () => {
				this.removeRequest(request);
				subscription.unsubscribe();
			};
		});
	}

	removeRequest(request: HttpRequest<any>) {
		const index = this.requests.indexOf(request);
		if (index >= 0) this.requests.splice(index, 1);
		this.loaderService.isLoading.next(this.requests.length > 0);
	}
}
