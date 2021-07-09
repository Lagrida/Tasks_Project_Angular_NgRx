import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AppState } from '../reducers';
import { getToken } from '../users/store/global-users.selectors';

@Injectable({
  providedIn: 'root'
})
export class JwtHttpInterceptorService implements HttpInterceptor{
  constructor(private store: Store<AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        req = req.clone({
          setHeaders:{
            //'Content-Type':  'application/json',
            'Accept' : 'application/json'
          }
        });
        if(token != null){
          req = req.clone({
            setHeaders:{
              Authorization : 'Bearer ' + token
            }
          });
        }
        return next.handle(req);
      })
    );
  }
}
