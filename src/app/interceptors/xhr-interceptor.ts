import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let reqHeaders = req.headers;

    const ip = localStorage.getItem("client_ip");
    if(ip){

      reqHeaders = reqHeaders.set('X-Forwarded-For', ip);
      reqHeaders = reqHeaders.set('X-Requested-With', 'XMLHttpRequest');

      const jws = localStorage.getItem("jws_token");
      if(jws){
        reqHeaders = reqHeaders.set('Authorization', 'Bearer '+jws);
      }
      
    }

    const xhr = req.clone({
      headers: reqHeaders
    });
    
    return next.handle(xhr);
  }

}
