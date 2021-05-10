import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { FeedResponse } from '../types/FeedResponse';
import { HttpClientError } from '../types/HttpClientError';
import { Widget } from '../types/Widget';

@Component({
  selector: 'app-widget-deck',
  templateUrl: './widget-deck.component.html',
  styleUrls: ['./widget-deck.component.css']
})
export class WidgetDeckComponent implements OnInit {

  @Input() widget: Widget | undefined;

  errorResponse: HttpClientError | undefined;
  feedResponse: FeedResponse | undefined;

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
    const options = this.widget?.widgetValue ? { params: new HttpParams().set('feedUrl', this.widget.widgetValue) } : undefined;
    this.feedService.getFeed(options).subscribe((data:any) => {
      if(data?.error_message){
        this.errorResponse = data as HttpClientError;
      }else{
        this.feedResponse = data as FeedResponse;
      }
    });
  }

}
