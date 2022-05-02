import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class InternetConnectivityInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!window.navigator.onLine) {
			return throwError({
				error: {
					data: null,
					detailedMessage: null,
					message:
						"Il se peut que votre navigateur n'a pas accès à Internet. Prière de vérifier votre connexion avant d'utiliser la plateforme.",
					timestamp: null,
				},
				status: 500,
				statusText: '500',
			});
		}

		return next.handle(request);
	}
}
