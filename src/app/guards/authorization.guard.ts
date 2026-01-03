import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard  {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const tokenExpDate = localStorage.getItem("token_exp_date");
      const admin = localStorage.getItem("admin");

      if (tokenExpDate) {
        const expDate = DateTime.fromISO(tokenExpDate);
        if(DateTime.now() < expDate){

          if(admin === "true"){
            return true;
          }else{
            return this.router.parseUrl('/');
          }
          
        }else{
          //Logout
          localStorage.clear();
        }
      }
  
      return this.router.parseUrl('/login');
  }
  
}
