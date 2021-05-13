import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedService } from '../services/feed.service';
import { WidgetTypesService } from '../services/widget-types.service';
import { WidgetsService } from '../services/widgets.service';
import { FeedResponse } from '../types/FeedResponse';
import { HMPagination } from '../types/HMPagination';
import { HttpClientError } from '../types/HttpClientError';
import { Widget } from '../types/Widget';
import { WidgetType } from '../types/WidgetType';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.css']
})
export class AddWidgetComponent implements OnInit {

  errorResponse: HttpClientError | undefined;
  paginatedWidgetTypes: HMPagination | undefined;

  widgetType = new FormControl('', Validators.required);
  selectedWidgetType: WidgetType | undefined;

  widgetValue = new FormControl('', Validators.required);

  feedErrorResponse: HttpClientError | undefined;
  feedResponse: FeedResponse | undefined;

  widgetTitle = new FormControl('', Validators.required);

  isVerifying: boolean = false;

  createdWidget: Widget | undefined;

  constructor(
    private router: Router,
    private widgetTypesService: WidgetTypesService,
    private feedService: FeedService,
    private widgetsService: WidgetsService
  ) { }

  ngOnInit(): void {

    this.widgetTypesService.getWidgetTypes().subscribe((data:any) => {
      if(data?.error_message){
        this.errorResponse = data as HttpClientError;
      }else{
        this.paginatedWidgetTypes = data as HMPagination;
      }
    });

  }

  close(){
    this.router.navigate(['/manage-widgets']);
  }

  changeWidgetType(){
    const widgetTypeValue = this.widgetType.value;
    this.selectedWidgetType = this.paginatedWidgetTypes?._embedded.widgetTypes.find(w => w.widgetType === widgetTypeValue);
    this.widgetValue.setValue(this.selectedWidgetType ? this.selectedWidgetType.defaultValue : '');
    if(this.selectedWidgetType?.defaultValue){
      this.widgetValue.disable();
      this.verifySource();
    }else{
      this.widgetValue.enable();
    }
    //reset
    this.feedResponse = undefined;
    this.feedErrorResponse = undefined;
  }

  verifySource(){
    this.isVerifying = true;
    this.feedResponse = undefined;
    this.feedErrorResponse = undefined;
    const options = { params: new HttpParams().set('feedUrl', this.widgetValue.value) };
    this.feedService.getFeed(options).subscribe((data:any) => {
      if(data?.error_message){
        this.feedErrorResponse = data as HttpClientError;
        this.isVerifying = false;
      }else{
        this.feedResponse = data as FeedResponse;
        this.widgetTitle.setValue(this.feedResponse.feedTitle);
        this.widgetValue.disable();
        this.isVerifying = false;
      }
    });
  }

  addWidget(){
    this.widgetsService.createWidget({widgetTitle: this.widgetTitle.value, widgetValue: this.widgetValue.value} as Widget).subscribe((data:any) => {
      if(data?.error_message){
        this.errorResponse = data as HttpClientError;
      }else{
        this.createdWidget = data as Widget;
        if(this.selectedWidgetType){
          this.widgetsService.createWidgetTypeAssociation(this.createdWidget, this.selectedWidgetType).subscribe((data:any) => {
            if(data?.error_message){
              this.errorResponse = data as HttpClientError;
            }else{
              this.close();
            }
          });
        }
      }
    });

  }

}
