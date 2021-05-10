import { Component, OnInit } from '@angular/core';
import { WidgetsService } from '../services/widgets.service';
import { HMPagination } from '../types/HMPagination';
import { HttpClientError } from '../types/HttpClientError';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  errorResponse: HttpClientError | undefined;
  paginatedWidgets: HMPagination | undefined;

  constructor(
    private widgetsService: WidgetsService
  ) { }

  ngOnInit(): void {

    this.widgetsService.getWidgets().subscribe((data:any) => {
      if(data?.error_message){
        this.errorResponse = data as HttpClientError;
      }else{
        this.paginatedWidgets = data as HMPagination;
      }
    });

  }
  

}
