import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationRequest } from '../types/AuthenticationRequest';
import { AuthenticationResponse } from '../types/AuthenticationResponse';
import { HttpClientError } from '../types/HttpClientError';
import { Router } from '@angular/router';
import { IpService } from '../services/ip.service';
import { DateTime } from "luxon";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorResponse: HttpClientError | undefined;

  ip: string = "";

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  //Getters are necessary for form validation
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private ipService: IpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ipService.getIp().subscribe((data:any) => {
      if(data.ip){
        this.ip = data.ip;
      }
    });
  }

  onSubmit(){

    //clear errors if any received before
    this.errorResponse = undefined;

    //set request
    const authenticationRequest = { username: this.username?.value, password: this.password?.value, ip: this.ip} as AuthenticationRequest

    //call
    this.authenticationService.authenticate(authenticationRequest).subscribe((data:any) => {
      if(data?.error_message){
        this.errorResponse = data as HttpClientError;
        //Override message for reasonable repsponse
        if(this.errorResponse.status_code === 401){
          this.errorResponse.error_message = "Authentication failed. Please check your credentials and try again.";
        }
      }else{
        const authenticationResponse = data as AuthenticationResponse;
        const tokenExpDate = DateTime.now().plus(authenticationResponse.expirationMs).toISO();
        localStorage.setItem('token_exp_date', tokenExpDate);
        localStorage.setItem('jws_token', authenticationResponse.token);
        localStorage.setItem('client_ip', authenticationResponse.ip);
        localStorage.setItem('admin', authenticationResponse.admin ? "true" : "false");
        this.router.navigate(['/']);
      }
    });

  }

}
