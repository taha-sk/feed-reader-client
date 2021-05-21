import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { WidgetTypesService } from '../services/widget-types.service';
import { FeedResponse } from '../types/FeedResponse';
import { Widget } from '../types/Widget';
import { WidgetType } from '../types/WidgetType';

import { WidgetDeckComponent } from './widget-deck.component';

describe('WidgetDeckComponent', () => {
  let component: WidgetDeckComponent;
  let fixture: ComponentFixture<WidgetDeckComponent>;

  //Services
  let feedService: FeedService;
  let widgetTypesService: WidgetTypesService;

  //Stubs for test (Mocks)
  let widgetTypesServiceStub: Partial<WidgetTypesService>;
  let feedServiceStub: Partial<FeedService>;

  beforeEach(async () => {
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
      declarations: [ WidgetDeckComponent ],
      providers: [ { provide: WidgetTypesService, useValue: widgetTypesServiceStub }, 
        { provide: FeedService, useValue: feedServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDeckComponent);
    component = fixture.componentInstance;
    component.widget = { id:1, widgetTitle:"wtitle", widgetValue: "wvalue", _links: {widgetType: {href: "url"}}} as Widget;
    widgetTypesService = TestBed.inject(WidgetTypesService);
    feedService = TestBed.inject(FeedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial state', () => {
    const title = fixture.nativeElement.querySelector('h4');
    expect(title.textContent).toEqual("wtitle");
    expect(component.isQuote).toEqual(false);
  });

});
