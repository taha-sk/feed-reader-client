import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { WidgetTypesService } from '../services/widget-types.service';
import { WidgetsService } from '../services/widgets.service';
import { FeedResponse } from '../types/FeedResponse';
import { HMPagination } from '../types/HMPagination';
import { Widget } from '../types/Widget';
import { WidgetType } from '../types/WidgetType';

import { AddWidgetComponent } from './add-widget.component';

describe('AddWidgetComponent', () => {
  let component: AddWidgetComponent;
  let fixture: ComponentFixture<AddWidgetComponent>;

  //Services
  let router: Router;
  let widgetTypesService: WidgetTypesService;
  let feedService: FeedService;
  let widgetsService: WidgetsService;
  let formBuilder: FormBuilder;

  //Stubs for test (Mocks)
  let widgetTypesServiceStub: Partial<WidgetTypesService>;
  let feedServiceStub: Partial<FeedService>;
  let widgetsServiceStub: Partial<WidgetsService>;

  beforeEach(async () => {
    widgetTypesServiceStub = {
      getWidgetTypes(){
        const result = { _embedded: { widgetTypes: [{widgetType:"TYPE",typeName:"Type",defaultValue:"Value"}] }}as HMPagination;
        return of (result);
      }
    };
    feedServiceStub = {
      getFeed(){
        const result = { feedTitle:"Feedy", feedItems: []} as FeedResponse;
        return of (result);
      }
    };
    widgetsServiceStub = {
      createWidget(widget: Widget){
        return of (widget);
      },
      createWidgetTypeAssociation(widget: Widget, widgetType: WidgetType){
        return of (widget);
      }
    };
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ AddWidgetComponent ],
      providers: [ {provide: Router, useValue: routerSpy}, { provide: WidgetTypesService, useValue: widgetTypesServiceStub }, 
        { provide: FeedService, useValue: feedServiceStub }, 
        { provide: WidgetsService, useValue: widgetsServiceStub },
        FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWidgetComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    widgetTypesService = TestBed.inject(WidgetTypesService);
    feedService = TestBed.inject(FeedService);
    widgetsService = TestBed.inject(WidgetsService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial state', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toEqual("Add Widget");
    const widgetType = fixture.nativeElement.querySelector('#widgetTypeSelect');
    expect(widgetType).toBeDefined();
    expect(component.selectedWidgetType).toBeUndefined();
    const widgetValue = fixture.nativeElement.querySelector('#widgetValueInpt');
    expect(widgetValue).toBeNull();
    const widgetOk = fixture.nativeElement.querySelector('.alert-success');
    expect(widgetOk).toBeNull();
    const widgetTitle = fixture.nativeElement.querySelector('#widgetTitleInpt');
    expect(widgetTitle).toBeNull();
    const cancelBtn = fixture.nativeElement.querySelector('#cancelBtn');
    expect(cancelBtn.textContent).toEqual("Cancel");
    const submitBtn = fixture.nativeElement.querySelector('#addWidgetBtn');
    expect(submitBtn).toBeNull();
  });

  it('should show widget source after type is selected', () => {
    component.widgetType.setValue("TYPE");
    component.changeWidgetType();
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toEqual("Add Widget");
    const widgetType = fixture.nativeElement.querySelector('#widgetTypeSelect');
    expect(widgetType.value).toEqual("TYPE");
    expect(component.selectedWidgetType?.widgetType).toEqual("TYPE");
    const widgetValue = fixture.nativeElement.querySelector('#widgetValueInpt');
    expect(widgetValue).not.toBeNull();
  });

  it('should get widget title after source is set and verifySource is invoked', () => {
    component.widgetType.setValue("TYPE");
    component.changeWidgetType();
    component.widgetValue.setValue("Source");
    component.verifySource();
    fixture.detectChanges();
    expect(component.widgetTitle?.value).toEqual("Feedy");
    const widgetType = fixture.nativeElement.querySelector('#widgetTypeSelect');
    expect(widgetType.value).toEqual("TYPE");
    const widgetTitle = fixture.nativeElement.querySelector('#widgetTitleInpt');
    expect(widgetTitle.value).toEqual("Feedy");
    //AddButtonShouldShow
    const submitBtn = fixture.nativeElement.querySelector('#addWidgetBtn');
    expect(submitBtn).not.toBeNull();
  });

  it('should save widget with Add Widget', () => {
    component.widgetType.setValue("TYPE");
    component.changeWidgetType();
    component.widgetValue.setValue("Source");
    component.verifySource();
    component.addWidget();
    fixture.detectChanges();
    expect(component.widgetTitle?.value).toEqual("Feedy");
    // args passed to router.navigate() spy
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/manage-widgets']);
  });

});
