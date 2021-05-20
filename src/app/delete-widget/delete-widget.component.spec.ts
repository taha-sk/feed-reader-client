import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { WidgetsService } from '../services/widgets.service';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { Widget } from '../types/Widget';

import { DeleteWidgetComponent } from './delete-widget.component';

describe('DeleteWidgetComponent', () => {
  let component: DeleteWidgetComponent;
  let fixture: ComponentFixture<DeleteWidgetComponent>;

  //Services
  let widgetsService: WidgetsService;
  let route: ActivatedRouteStub;
  let router: Router;

  //Stubs for test (Mocks)
  let widgetsServiceStub: Partial<WidgetsService>;

  beforeEach(async () => {
    widgetsServiceStub = {
      getWidget(widgetId: string){
        return of ({id: Number(widgetId), widgetTitle:"wtitle", widgetValue: "wvalue", _links: { self: {href:"url"}}} as Widget);
      },
      deleteWidget(path: string){
        return of ({});
      }
    };
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    route = new ActivatedRouteStub();
    route.snapshot.setParam("id", "1");
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ DeleteWidgetComponent ],
      providers: [ {provide: Router, useValue: routerSpy}, {provide: ActivatedRoute, useValue: route},
        { provide: WidgetsService, useValue: widgetsServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWidgetComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    widgetsService = TestBed.inject(WidgetsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial state', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toEqual("Delete Widget");
    expect(component.widgetTitle.value).toEqual("wtitle");
    expect(component.widgetValue.value).toEqual("wvalue");
  });

  it('should delete widget', () => {
    component.deleteWidget();
    fixture.detectChanges();
    // args passed to router.navigate() spy
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/manage-widgets']);
  });

});
