import { HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FeedResponse } from '../types/FeedResponse';

import { FeedService } from './feed.service';

describe('FeedService', () => {
  let service: FeedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(FeedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send get request to server', () => {
    const testRequest = { params: new HttpParams().set('feedUrl', "url") };
    const testData = {feedTitle:"title", feedItems:[]} as FeedResponse;
    const testUrl = "/getFeed";

    service.getFeed(testRequest, testUrl).subscribe((data:any) => {
      expect(data.feedTitle).toEqual(testData.feedTitle);
      expect(data.feedItems).toEqual(testData.feedItems);
    });

    const req = httpTestingController.expectOne(testUrl + "?feedUrl=url");
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
