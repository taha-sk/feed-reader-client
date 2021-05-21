import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { WidgetsService } from '../services/widgets.service';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { HMPagination } from '../types/HMPagination';
import { Widget } from '../types/Widget';

import { WidgetListComponent } from './widget-list.component';

describe('WidgetListComponent', () => {
  let component: WidgetListComponent;
  let fixture: ComponentFixture<WidgetListComponent>;

  //Services
  let widgetsService: WidgetsService;
  let router: Router;
  let route: ActivatedRouteStub;

  //Stubs for test (Mocks)
  let widgetsServiceStub: Partial<WidgetsService>;

  beforeEach(async () => {
    widgetsServiceStub = {
      getWidgets(){
        const result = {_embedded:{widgets:[{widgetTitle:"title", widgetValue:"value"}]}} as HMPagination;
        return of (result);
      }
    };
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    route = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [ WidgetListComponent ],
      providers: [ {provide: Router, useValue: routerSpy},  
        { provide: WidgetsService, useValue: widgetsServiceStub }, {provide: ActivatedRoute, useValue: route} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    widgetsService = TestBed.inject(WidgetsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial state', () => {
    expect(component.isWidgetLimit).toEqual(true);
    const rowWidgetTitle = fixture.nativeElement.querySelector('#rowWidgetTitle');
    expect(rowWidgetTitle.textContent).toEqual("title");
    const rowWidgetValue = fixture.nativeElement.querySelector('#rowWidgetValue');
    expect(rowWidgetValue.textContent).toEqual("value");
    const addWidgetBtn = fixture.nativeElement.querySelector('#addWidgetBtn');
    expect(addWidgetBtn.disabled).toEqual(false);
  });

  it('should route to add-widget', () => {
    component.addWidget();
    fixture.detectChanges();
    // args passed to router.navigate() spy
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['./add-widget']);
  });

  it('should route to delete-widget', () => {
    component.deleteWidget({id:1, widgetTitle:"title", widgetValue:"value"} as Widget);
    fixture.detectChanges();
    // args passed to router.navigate() spy
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toEqual('./delete-widget');
  });

});
