import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationRequest } from '../types/AuthenticationRequest';
import { AuthenticationResponse } from '../types/AuthenticationResponse';

import { AuthenticationService } from './authentication.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send post request to server', () => {
    const testRequest = {username:"user", password:"pass", ip:"127.0.0.1"} as AuthenticationRequest;
    const testData = {token:"token", expirationMs:100, ip:"127.0.0.1", admin:false} as AuthenticationResponse;
    const testUrl = "/authenticate";

    service.authenticate(testRequest, testUrl).subscribe((data:any) => {
      expect(data.token).toEqual(testData.token);
      expect(data.expirationMs).toEqual(testData.expirationMs);
      expect(data.ip).toEqual(testData.ip);
      expect(data.admin).toEqual(testData.admin);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  
});
