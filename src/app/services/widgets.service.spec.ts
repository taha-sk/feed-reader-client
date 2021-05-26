import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { config } from 'src/AppConfig';
import { HMPagination } from '../types/HMPagination';
import { Widget } from '../types/Widget';
import { WidgetType } from '../types/WidgetType';

import { WidgetsService } from './widgets.service';

describe('WidgetsService', () => {
  let service: WidgetsService;
  let httpTestingController: HttpTestingController;
  let widgetsPath: string;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(WidgetsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    widgetsPath = config.apiHost;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get widget', () => {
    const testData = {widgetTitle:"title", widgetValue:"value"} as Widget;
    const testUrl = "/widget";

    service.getWidget("1").subscribe((data:any) => {
      expect(data.widgetTitle).toEqual(testData.widgetTitle);
      expect(data.widgetValue).toEqual(testData.widgetValue);
    });

    const req = httpTestingController.expectOne(widgetsPath + "/api/widgets/1");
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should get widgets', () => {
    const testData = {_embedded:{widgets:[{widgetTitle:"title", widgetValue:"value"}]}} as HMPagination;
    const testUrl = "/widget";

    service.getWidgets(testUrl).subscribe((data:any) => {
      expect(data._embedded.widgets[0].widgetTitle).toEqual(testData._embedded.widgets[0].widgetTitle);
      expect(data._embedded.widgets[0].widgetValue).toEqual(testData._embedded.widgets[0].widgetValue);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should create widget', () => {
    const testData = {widgetTitle:"title", widgetValue:"value"} as Widget;
    const testUrl = "/widget";

    service.createWidget(testData, testUrl).subscribe((data:any) => {
      expect(data.widgetTitle).toEqual(testData.widgetTitle);
      expect(data.widgetValue).toEqual(testData.widgetValue);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('should create widget type association', () => {
    const testWidget = {widgetTitle:"title", widgetValue:"value", _links:{widgetType:{href:"/pathToWidgetType"}}} as Widget;
    const testWidgetType = {widgetType:"type", typeName:"name", defaultValue:"value", _links:{self:{href:"/widgetType"}}} as WidgetType;

    service.createWidgetTypeAssociation(testWidget, testWidgetType).subscribe((data:any) => {
      expect(data).toEqual({});
    });

    const req = httpTestingController.expectOne("/pathToWidgetType");
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });

  it('should delete widget', () => {
    const testUrl = "/widget";

    service.deleteWidget(testUrl).subscribe((data:any) => {
      expect(data).toEqual({});
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
