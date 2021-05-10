import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../types/AuthenticationRequest';
import { AuthenticationResponse } from '../types/AuthenticationResponse';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { config } from 'src/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationPath = config.apiHost + "/api/authenticate";

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  authenticate(authenticationRequest: AuthenticationRequest, authPath?: string){
    return this.http.post<AuthenticationResponse>( authPath ? authPath : this.authenticationPath, authenticationRequest)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

}
