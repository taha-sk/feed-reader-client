import { TestBed } from '@angular/core/testing';

import { WidgetTypesService } from './widget-types.service';

describe('WidgetTypesService', () => {
  let service: WidgetTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
