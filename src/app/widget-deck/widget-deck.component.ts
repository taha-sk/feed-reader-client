import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { WidgetTypesService } from '../services/widget-types.service';
import { FeedResponse } from '../types/FeedResponse';
import { HttpClientError } from '../types/HttpClientError';
import { Widget } from '../types/Widget';
import { WidgetType } from '../types/WidgetType';

@Component({
    selector: 'app-widget-deck',
    templateUrl: './widget-deck.component.html',
    styleUrls: ['./widget-deck.component.css'],
    standalone: false
})
export class WidgetDeckComponent implements OnInit {

  @Input() widget: Widget | undefined;

  errorResponse: HttpClientError | undefined;
  feedResponse: FeedResponse | undefined;
  isQuote: boolean | undefined;

  constructor(
    private feedService: FeedService,
    private widgetTypesService: WidgetTypesService
  ) { }

  ngOnInit(): void {
    this.refresh();

    if (this.widget) {

      this.widgetTypesService.getWidgetType(this.widget._links.widgetType.href).subscribe((data: any) => {
        if (data?.error_message) {
          this.errorResponse = data as HttpClientError;
        } else {
          const widgetType = (data as WidgetType).widgetType;
          this.isQuote = widgetType === "QUOTE";
        }
      });

    }

  }

  refresh(){
    this.feedResponse = undefined;
    this.errorResponse = undefined;
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
