import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetsService } from '../services/widgets.service';
import { HMPagination } from '../types/HMPagination';
import { HttpClientError } from '../types/HttpClientError';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  errorResponse: HttpClientError | undefined;
  paginatedWidgets: HMPagination | undefined;

  constructor(
    private widgetsService: WidgetsService,
    private router: Router,
    private route: ActivatedRoute,
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

  addWidget(){
    this.router.navigate(['./add-widget'], { relativeTo: this.route });
  }

}
