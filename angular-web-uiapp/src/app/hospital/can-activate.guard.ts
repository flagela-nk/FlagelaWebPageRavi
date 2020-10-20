import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

         
@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.authenticatedRole.pipe(map(item => item == "HOSPITAL"));
    }
}
