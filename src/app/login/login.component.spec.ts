import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { IpService } from '../services/ip.service';
import { AuthenticationRequest } from '../types/AuthenticationRequest';
import { AuthenticationResponse } from '../types/AuthenticationResponse';
import { HttpClientError } from '../types/HttpClientError';
import { IP } from '../types/IP';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  //Services
  let formBuilder: FormBuilder;
  let authenticationService: AuthenticationService;
  let ipService: IpService;
  let router: Router;

  //Stubs for test (Mocks)
  let authenticationServiceStub: Partial<AuthenticationService>;
  let ipServiceStub: Partial<IpService>;

  beforeEach(async () => {
    authenticationServiceStub = {
      authenticate(authenticationRequest: AuthenticationRequest){
        const result = { token:"token", expirationMs: 1000, ip: authenticationRequest.ip, admin: false} as AuthenticationResponse;
        return of (result);
      }
    };
    ipServiceStub = {
      getIp(){
        const result = { ip: "127.0.0.1" } as IP;
        return of (result);
      }
    };
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [ {provide: Router, useValue: routerSpy}, { provide: AuthenticationService, useValue: authenticationServiceStub }, 
        { provide: IpService, useValue: ipServiceStub }, FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    authenticationService = TestBed.inject(AuthenticationService);
    ipService = TestBed.inject(IpService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial state', () => {
    expect(component.ip).toEqual("127.0.0.1");
    const submit = fixture.nativeElement.querySelector('[type=submit]');
    expect(submit.textContent).toEqual("Sign in");
    expect(submit.disabled).toEqual(true);
  });

  it('should login', () => {
    component.loginForm.patchValue({username:"user", password:"pass"});
    component.onSubmit();
    fixture.detectChanges();
    expect(component.ip).toEqual("127.0.0.1");
    expect(localStorage.getItem("jws_token")).toEqual("token");
    expect(localStorage.getItem("admin")).toEqual("false");
    // args passed to router.navigate() spy
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/']);
  });

  it('should show correct error message with false credentials', () => {
    authenticationService.authenticate = (authenticationRequest: AuthenticationRequest) => of ( { error_message: "False credentials", status_code: 401} as HttpClientError );
    component.loginForm.patchValue({username:"user", password:"wrong_pass"});
    component.onSubmit();
    fixture.detectChanges();
    const errorAlert = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorAlert.textContent).toEqual("Authentication failed. Please check your credentials and try again.");
  });

});
