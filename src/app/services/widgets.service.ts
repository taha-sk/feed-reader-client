import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { config } from 'src/AppConfig';
import { HMPagination } from '../types/HMPagination';
import { Widget } from '../types/Widget';
import { WidgetType } from '../types/WidgetType';
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

  getWidget(widgetId: string){
    return this.http.get<Widget>(this.widgetsPath + "/" + widgetId )
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

  createWidget(widget: Widget, widgetsPath?: string){
    return this.http.post<Widget>(widgetsPath ? widgetsPath : this.widgetsPath, widget)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

  createWidgetTypeAssociation(widget: Widget, widgetType: WidgetType){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/uri-list'
      })
    };
    
    return this.http.put<Widget>(widget._links.widgetType.href, widgetType._links.self.href, httpOptions)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
    
  }

  deleteWidget(widgetPath: string){
    return this.http.delete(widgetPath)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }
  
}
