import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { config } from 'src/AppConfig';
import { FeedResponse } from '../types/FeedResponse';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private feedPath = config.apiHost + "/api/getFeed";

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) { }

  getFeed(options?: {params:HttpParams}, feedPath?: string){
    return this.http.get<FeedResponse>( feedPath ? feedPath : this.feedPath, options)
    .pipe(
      catchError(this.httpErrorHandler.handleError)
    );
  }

}
