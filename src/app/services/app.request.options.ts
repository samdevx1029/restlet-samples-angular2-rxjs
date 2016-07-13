import { Injectable, Inject, OpaqueToken} from '@angular/core';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';

export const WEBAPI_URL_TOKEN = new OpaqueToken('webApiBaseUrl');

export class AppRequestOptions extends BaseRequestOptions {
  constructor(@Inject(WEBAPI_URL_TOKEN) private webApiBaseUrl:string) {
  	super();
  	console.log('webApiBaseUrl = '+webApiBaseUrl);
  }

  merge(options?:RequestOptionsArgs):RequestOptions {
    options.url = (this.webApiBaseUrl ? this.webApiBaseUrl :
    				'https://bookapi.apispark.net/v1') + options.url;
    return super.merge(options);
  }
}