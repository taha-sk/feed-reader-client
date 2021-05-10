import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientError } from '../types/HttpClientError';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor() { }

  handleError(error: HttpErrorResponse) {

    const errorResponse = {} as HttpClientError

    if (error.error instanceof ErrorEvent) {
      //Client side errors
      errorResponse.error_message = `An error occurred: ${error.error.message}. ` + `Please refresh the page and try again.`;
    } else {
      //Server side errors
      errorResponse.error_message = `Server returned error code ${error.status}. ` + `Please refresh the page and try again.`;
      errorResponse.status_code = error.status
      errorResponse.error_body = error.error

      console.warn(error);
      console.warn(errorResponse);

      //Validation errors
      if(error.error.errors !== undefined){
        errorResponse.errors = error.error.errors
      }
    }

    //Show error in console
    console.warn(errorResponse);

    return of ( errorResponse );
  }
  
}
