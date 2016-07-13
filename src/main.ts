import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions } from '@angular/http';
import { AppComponent, environment } from './app/';
import { ErrorNotifierService } from './app/services/error.notifier';
import { CustomHttp } from './app/services/custom.http';
import { AppRequestOptions, WEBAPI_URL_TOKEN } from './app/services/app.request.options';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  ErrorNotifierService,
  HTTP_PROVIDERS,
  { provide:Http,
    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, errorNotifier: ErrorNotifierService) => {
      return new CustomHttp(backend, defaultOptions, errorNotifier);
    },
    deps: [ XHRBackend, RequestOptions, ErrorNotifierService ]
  },
  { provide: WEBAPI_URL_TOKEN, useValue: 'https://bookapi.apispark.net/v1' },
  { provide: RequestOptions, useClass: AppRequestOptions }
]);