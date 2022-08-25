import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
      //if(sessionStorage.getItem("token")!==null){
        req=req.clone({setHeaders:{ Authorization:sessionStorage.getItem("token")||''}});
      //}
      return next.handle(req);
  }
}
