import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Interceptors

import { HttpJwtTokenInterceptor } from './http-jwt-token.interceptor';
import { InternetConnectivityInterceptor } from './internet-connectivity.interceptor';
import { LoaderInterceptor } from './loader.interceptor';

export const interceptorProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpJwtTokenInterceptor,
		multi: true,
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: InternetConnectivityInterceptor,
		multi: true,
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: LoaderInterceptor,
		multi: true,
	},
];
