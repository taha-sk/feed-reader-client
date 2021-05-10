import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { IP } from '../types/IP';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private ipProvider = "https://api.ipify.org/?format=json";

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  getIp(providerUrl?: string){
    return this.http.get<IP>(providerUrl ? providerUrl : this.ipProvider)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

}
