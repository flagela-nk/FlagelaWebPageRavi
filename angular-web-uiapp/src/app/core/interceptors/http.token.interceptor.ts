import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService:AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headersConfig:any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = window.localStorage.getItem('jwtToken');

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    
    if(req.headers.keys().includes('Content-Type')){
      headersConfig['Content-Type'] = req.headers.get('Content-Type');
      // debugger;
    }

    
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // debugger;
        if (err.status !== 403) {
         return;

        }
        // Todo: remove return
        return;
        this.authService.logout()
        this.router.navigate(['auth-login']);
      }
    }));
  }
}
