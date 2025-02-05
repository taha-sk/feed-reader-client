import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HMPagination } from '../types/HMPagination';
import { WidgetType } from '../types/WidgetType';

import { WidgetTypesService } from './widget-types.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WidgetTypesService', () => {
  let service: WidgetTypesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(WidgetTypesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get widget type', () => {
    const testData = {widgetType:"type", typeName:"name", defaultValue:"value"} as WidgetType;
    const testUrl = "/widgetTypes";

    service.getWidgetType(testUrl).subscribe((data:any) => {
      expect(data.widgetType).toEqual(testData.widgetType);
      expect(data.typeName).toEqual(testData.typeName);
      expect(data.defaultValue).toEqual(testData.defaultValue);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should get widget types', () => {
    const testData = {_embedded:{widgetTypes:[{widgetType:"type", typeName:"name", defaultValue:"value"}]}} as HMPagination;
    const testUrl = "/widgetTypes";

    service.getWidgetTypes(testUrl).subscribe((data:any) => {
      expect(data._embedded.widgetTypes[0].widgetType).toEqual(testData._embedded.widgetTypes[0].widgetType);
      expect(data._embedded.widgetTypes[0].typeName).toEqual(testData._embedded.widgetTypes[0].typeName);
      expect(data._embedded.widgetTypes[0].defaultValue).toEqual(testData._embedded.widgetTypes[0].defaultValue);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
