import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { config } from 'src/AppConfig';
import { HMPagination } from '../types/HMPagination';
import { WidgetType } from '../types/WidgetType';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetTypesService {

  private widgetTypesPath = config.apiHost + "/api/widgetTypes";

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  getWidgetType(widgetTypePath: string, options?: {params:HttpParams}){
    return this.http.get<WidgetType>(widgetTypePath, options)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

  getWidgetTypes(widgetTypesPath?: string, options?: {params:HttpParams}){
    return this.http.get<HMPagination>( widgetTypesPath ? widgetTypesPath : this.widgetTypesPath, options)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

}
