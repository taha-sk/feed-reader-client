import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WidgetsService } from '../services/widgets.service';
import { HttpClientError } from '../types/HttpClientError';
import { Widget } from '../types/Widget';

@Component({
  selector: 'app-delete-widget',
  templateUrl: './delete-widget.component.html',
  styleUrls: ['./delete-widget.component.css']
})
export class DeleteWidgetComponent implements OnInit {

  widget: Widget | undefined;
  errorResponse: HttpClientError | undefined;

  widgetTitle = new FormControl({ value: '', disabled: true });
  widgetValue = new FormControl({ value: '', disabled: true });

  constructor(
    private widgetsService: WidgetsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const widgetIdFromRoute = routeParams.get('id');
    if(widgetIdFromRoute){
      this.widgetsService.getWidget(widgetIdFromRoute).subscribe((data:any) => {
        if(data?.error_message){
          this.errorResponse = data as HttpClientError;
        }else{
          this.widget = data as Widget;
          this.widgetTitle.setValue(this.widget.widgetTitle);
          this.widgetValue.setValue(this.widget.widgetValue);
        }
      });
    }
  }

  close(){
    this.router.navigate(['/manage-widgets']);
  }

  deleteWidget(){
    if(this.widget){
      this.widgetsService.deleteWidget(this.widget._links.self.href).subscribe((data:any) => {
        if(data?.error_message){
          this.errorResponse = data as HttpClientError;
        }else{
          this.close();
        }
      });
    }
  }

}
