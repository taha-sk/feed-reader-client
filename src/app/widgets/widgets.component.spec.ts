import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FeedService } from '../services/feed.service';
import { WidgetTypesService } from '../services/widget-types.service';
import { WidgetsService } from '../services/widgets.service';
import { FeedResponse } from '../types/FeedResponse';
import { HMPagination } from '../types/HMPagination';
import { WidgetType } from '../types/WidgetType';
import { WidgetDeckComponent } from '../widget-deck/widget-deck.component';

import { WidgetsComponent } from './widgets.component';

describe('WidgetsComponent', () => {
  let component: WidgetsComponent;
  let fixture: ComponentFixture<WidgetsComponent>;

  //Services
  let widgetsService: WidgetsService;

  //Sub Services - For Component Imports
  let feedService: FeedService;
  let widgetTypesService: WidgetTypesService;

  //Stubs for test (Mocks)
  let widgetsServiceStub: Partial<WidgetsService>;

  //Sub Stubs for test (Mocks)
  let widgetTypesServiceStub: Partial<WidgetTypesService>;
  let feedServiceStub: Partial<FeedService>;

  beforeEach(async () => {
    widgetsServiceStub = {
      getWidgets(){
        const result = {_embedded:{widgets:[{widgetTitle:"title", widgetValue:"value", _links:{widgetType:{href : "url"}}}]}} as HMPagination;
        return of (result);
      }
    };
    feedServiceStub = {
      getFeed(){
        const result = { feedTitle:"Feedy", feedItems: []} as FeedResponse;
        return of (result);
      }
    };
    widgetTypesServiceStub = {
      getWidgetType(){
        const result = { widgetType: "TYPE", typeName:"Type", defaultValue: "value" } as WidgetType;
        return of (result);
      }
    };
    await TestBed.configureTestingModule({
      declarations: [ WidgetsComponent, SearchBarComponent, WidgetDeckComponent ],
      providers: [ { provide: WidgetsService, useValue: widgetsServiceStub }, { provide: WidgetTypesService, useValue: widgetTypesServiceStub }, 
        { provide: FeedService, useValue: feedServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsComponent);
    component = fixture.componentInstance;
    widgetsService = TestBed.inject(WidgetsService);
    widgetTypesService = TestBed.inject(WidgetTypesService);
    feedService = TestBed.inject(FeedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
