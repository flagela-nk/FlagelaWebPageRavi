import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    ApiService
  ]
})
export class CoreModule { }
