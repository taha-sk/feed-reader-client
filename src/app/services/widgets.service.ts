import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { config } from 'src/AppConfig';
import { HMPagination } from '../types/HMPagination';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private widgetsPath = config.apiHost + "/api/widgets";

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  getWidgets(widgetsPath?: string, options?: {params:HttpParams}){
    return this.http.get<HMPagination>( widgetsPath ? widgetsPath : this.widgetsPath, options)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }
  
}
