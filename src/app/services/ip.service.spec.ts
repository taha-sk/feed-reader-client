import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IpService } from './ip.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('IpService', () => {
  let service: IpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(IpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return IP information', () => {
    const testData = {ip: '127.0.0.1'};
    const testUrl = "/ip";

    service.getIp(testUrl).subscribe((data:any) => {
      expect(data.ip).toEqual("127.0.0.1");
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should return Bad Request', () => {
    const emsg = { errors: [{message: "Invalid Request"}]};

    const testUrl = "/ip";

    service.getIp(testUrl).subscribe((data:any) => {
      expect(data.errors[0].message).toEqual("Invalid Request");
      expect(data.status_code).toEqual(400);
      expect(data.error_message).toEqual("Server returned error code 400. Please refresh the page and try again.");
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(emsg, { status: 400, statusText: 'Bad Request' });
  });

  it('should return Connection Timeout Error', () => {
    const mockError = new ErrorEvent('Network error', {
      message: "Connection Timeout",
    });

    const testUrl = "/ip";

    service.getIp(testUrl).subscribe((data:any) => {
      expect(data.errors).toBeUndefined();
      expect(data.status_code).toBeUndefined();
      expect(data.error_message).toEqual("An error occurred: Connection Timeout. Please refresh the page and try again.");
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.error(mockError);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
